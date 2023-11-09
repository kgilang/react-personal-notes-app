import React from 'react';
import { getInitialData } from '../utils/index';
import { Alert, Divider, Snackbar, Stack } from '@mui/material';
import Footer from './Footer';
import NoteInput from './NoteInput';
import NoteFind from './NoteFind';
import NoteList from './NoteList';
import Topbar from './Topbar';

class PersonalNoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoNotif: null,
      originalNotes: getInitialData(),
      notes: getInitialData(),
      archived: false,
    };

    this.onHandleCloseAlert = this.onHandleCloseAlert.bind(this);
    this.onGetNoteHandler = this.onGetNoteHandler.bind(this);
    this.onFindNoteHandler = this.onFindNoteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
  }

  onHandleCloseAlert = () => {
    this.setState({ infoNotif: null });
  };

  onGetNoteHandler(isArchived = false) {
    const notes = this.state.originalNotes.filter(
      (note) => note.archived == isArchived
    );
    this.setState({
      notes,
      archived: isArchived,
    });
  }

  onFindNoteHandler({ findText }) {
    const lowerFindText = findText.toLowerCase();
    const notes = this.state.originalNotes.filter((note) =>
      note.title.toLowerCase().includes(lowerFindText)
    );
    this.setState({ notes });
  }

  onAddNoteHandler({ title, body }) {
    if (title.length == 0) {
      this.setState({
        infoNotif: <Alert severity='error'>Title tidak boleh kosong.</Alert>,
      });
      return;
    }

    if (body.length == 0) {
      this.setState({
        infoNotif: <Alert severity='error'>Body tidak boleh kosong.</Alert>,
      });
      return;
    }

    if (title.length > 50) {
      this.setState({
        infoNotif: (
          <Alert severity='error'>
            Title tidak boleh lebih dari 50 karakter.
          </Alert>
        ),
      });
      return;
    }

    this.setState((prevState) => {
      let nowDate = new Date();
      nowDate.setHours(nowDate.getHours() + 8);

      const notes = [
        ...prevState.notes,
        {
          id: +new Date(),
          title,
          body,
          createdAt: nowDate.toISOString(),
          archived: false,
        },
      ];

      return {
        infoNotif: (
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
              open={true}
              autoHideDuration={3000}
              onClose={this.onHandleCloseAlert}
            >
              <Alert severity='success' sx={{ width: '100%' }}>
                Catatan berhasil ditambahkan.
              </Alert>
            </Snackbar>
          </Stack>
        ),
        originalNotes: notes,
        notes,
      };
    });
  }

  onArchiveNoteHandler(id, setTo) {
    const notes = this.state.notes.map((note) => {
      if (note.id === id) {
        note.archived = setTo;
      }
      return note;
    });

    let notifLabel = 'Catatan diarsipkan.';
    if (!setTo) {
      notifLabel = 'Arsip berhasil dihapus.';
    }

    this.setState({
      infoNotif: (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar
            open={true}
            autoHideDuration={3000}
            onClose={this.onHandleCloseAlert}
          >
            <Alert severity='info' sx={{ width: '100%' }}>
              {notifLabel}
            </Alert>
          </Snackbar>
        </Stack>
      ),
      originalNotes: notes,
      notes,
    });
  }

  onDeleteNoteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({
      infoNotif: (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar
            open={true}
            autoHideDuration={3000}
            onClose={this.onHandleCloseAlert}
          >
            <Alert severity='info' sx={{ width: '100%' }}>
              Catatan telah dihapus.
            </Alert>
          </Snackbar>
        </Stack>
      ),
      originalNotes: notes,
      notes,
    });
  }

  render() {
    return (
      <div>
        <Topbar
          isArchived={this.state.archived}
          getNote={this.onGetNoteHandler}
        />
        {this.state.infoNotif}
        <NoteInput addNote={this.onAddNoteHandler} />
        <Divider />
        <NoteFind findNote={this.onFindNoteHandler} />
        <NoteList
          notes={this.state.notes}
          isArchived={this.state.archived}
          onArchived={this.onArchiveNoteHandler}
          onDelete={this.onDeleteNoteHandler}
        />
        <Footer />
      </div>
    );
  }
}

export default PersonalNoteApp;

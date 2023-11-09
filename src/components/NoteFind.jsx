import React from 'react';
import { Box, Container, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

class NoteFind extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      findText: '',
    };

    this.onFindTextChangeEventHandler =
      this.onFindTextChangeEventHandler.bind(this);
    this.onSearchEventHandler = this.onSearchEventHandler.bind(this);
  }

  onFindTextChangeEventHandler(event) {
    this.setState(() => {
      return {
        findText: event.target.value,
      };
    });
  }

  onSearchEventHandler(event) {
    event.preventDefault();
    // eslint-disable-next-line react/prop-types
    this.props.findNote({ findText: this.state.findText });
  }

  render() {
    return (
      <Container fixed>
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Paper
            component='form'
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 500,
            }}
            onSubmit={this.onSearchEventHandler}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Temukan Catatan'
              inputProps={{ 'aria-label': 'temukan catatan' }}
              value={this.state.findText}
              onChange={this.onFindTextChangeEventHandler}
            />
            <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </Container>
    );
  }
}

export default NoteFind;

import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';

function NoteItem({
  id,
  title,
  body,
  createdAt,
  isArchived,
  onArchived,
  onDelete,
}) {
  function getMonthName(monthNumber) {
    var monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    return monthNames[monthNumber];
  }

  let dateCreatedAt = new Date(createdAt);
  let day = dateCreatedAt.getDate();
  let month = getMonthName(dateCreatedAt.getMonth());
  let year = dateCreatedAt.getFullYear();
  let hours = dateCreatedAt.getUTCHours();
  let minutes = dateCreatedAt.getUTCMinutes();

  var humanCreatedAt =
    day +
    ' ' +
    month +
    ' ' +
    year +
    ' ' +
    (hours < 10 ? '0' : '') +
    hours +
    ':' +
    (minutes < 10 ? '0' : '') +
    minutes;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ height: '100%' }}>
        <Typography
          sx={{
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          color='text.secondary'
          gutterBottom
        >
          Catatan
          <Button
            size='small'
            onClick={() => onArchived(id, !isArchived)}
            sx={{ color: 'primary' }}
          >
            {isArchived ? <UnarchiveOutlinedIcon /> : <ArchiveOutlinedIcon />}
          </Button>
        </Typography>
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {humanCreatedAt}
        </Typography>
        <Typography variant='body2'>{body}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size='small' onClick={() => onDelete(id)} sx={{ color: 'red' }}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default NoteItem;

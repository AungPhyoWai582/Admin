import React, { useState } from "react";
// import { makeStyles } from '@mui/styles';
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
} from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import { Table } from "antd";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     padding: theme.spacing(2),
//   },
//   listItem: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   textField: {
//     width: '100%',
//   },
// }));

const CustomerDetail = () => {
  //   const classes = useStyles();

  const items = [1, 2, 3];

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedText(items[index]);
  };

  const handleSave = (index) => {
    // Update item in database with edited text
    setEditingIndex(-1);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell>No</TableCell>
          <TableCell>Item</TableCell>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableCell key={index}>
              {/* {editingIndex ? (
                <TextField
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
              ) : ( */}
                <ListItemText primary={item} />
              {/* // )} */}
              {editingIndex === index ? (
                <IconButton onClick={() => handleSave(index)}>
                  <Save />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleEdit(index)}>
                  <Edit />
                </IconButton>
              )}
            </TableCell>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerDetail;

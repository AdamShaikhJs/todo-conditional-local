import React from "react";
import { Box, Button, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

function List({ item, removeItem, editItem }) {
  return (
    <>
      <h1>list</h1>
      {item.map((item, i) => {
        const { id, title } = item;
        return (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: 30,
              width: 360,
              alignItem: "center",
              mt: 2,
            }}
          >
            <Box>
              <Typography>
                {i}. {title}
              </Typography>
            </Box>
            <Box>
              <EditIcon onClick={() => editItem(id)} />
              <DeleteForeverIcon
                sx={{ mx: 1 }}
                onClick={() => removeItem(id)}
              />
            </Box>
          </Box>
        );
      })}
    </>
  );
}

export default List;

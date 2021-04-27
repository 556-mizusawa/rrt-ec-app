import React, { useCallback, useEffect, useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/styles";
import { TextInput } from "../UIkit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { setSizeProps } from "./type";

const useStyles = makeStyles({
  inputSize: {
    marginRight: 17,
  },

  inputArea: {
    display: "flex",
    marginTop: 10,
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  checkIcon: {
    boxShadow: "none",
    marginTop: 2,
    marginLeft: 7,
  },
  iconCell: {
    height: 48,
    width: 48,
  },
});

const SetSizeArea: React.FC<setSizeProps> = (props) => {
  const classes = useStyles();

  const [index, setIndex] = useState<number>(0),
    [size, setSize] = useState<string>(""),
    [quantity, setQuantity] = useState<number>(0);

  const inputSize = useCallback(
    (event) => {
      setSize(event.target.value);
    },
    [setSize]
  );

  const inputQuantity = useCallback(
    (event) => {
      setQuantity(event.target.value);
    },
    [setQuantity]
  );

  const addSize = (index: number, size: string, quantity: string | number) => {
    if (size === "" || quantity === "") {
      // Required input blank
      alert("数量は半角数字で入力してください");
      setSize("");
      setQuantity(0);
      return false;
    } else {
      if (index === props.sizes.length) {
        props.setSizes((prevState: []) => [
          ...prevState,
          { size: size, quantity: quantity },
        ]);
        setIndex(index + 1);
        setSize("");
        setQuantity(0);
      } else {
        const newSizes = props.sizes;
        newSizes[index] = { size: size, quantity: quantity };
        props.setSizes(newSizes);
        setIndex(newSizes.length);
        setSize("");
        setQuantity(0);
      }
    }
  };

  const editSize = (index: number, size: string, quantity: number) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (deleteIndex: number) => {
    const newSizes = props.sizes.filter(
      (item: { size: string; quantity: number }, i: number) => i !== deleteIndex
    );
    props.setSizes(newSizes);
  };

  useEffect(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map(
                (item: { size: string; quantity: number }, i: number) => (
                  <TableRow key={item.size}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell> {item.quantity} </TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.iconCell}
                        onClick={() => editSize(i, item.size, item.quantity)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.iconCell}
                        onClick={() => {
                          deleteSize(i);
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
        <div>
          <div className={classes.inputArea}>
            <div className={classes.inputSize}>
              <TextInput
                variant="outlined"
                fullWidth={false}
                multiline={false}
                required={true}
                onChange={inputSize}
                rows={1}
                value={size}
                type={"text"}
              />
            </div>

            <div>
              <TextInput
                variant="outlined"
                fullWidth={false}
                multiline={false}
                required={true}
                onChange={inputQuantity}
                rows={1}
                value={quantity}
                type={"number"}
              />
            </div>
            <Fab
              className={classes.checkIcon}
              size="small"
              color="primary"
              aria-label="add"
              onClick={() => addSize(index, size, quantity)}>
              <AddIcon />
            </Fab>
          </div>
        </div>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;

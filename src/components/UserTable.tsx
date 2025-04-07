import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useUsers } from "../hooks/useUsers";
import CircularProgress from "@mui/material/CircularProgress";
import { Chip, Link, TextField } from "@mui/material";
import { CheckCircleOutline, CloseOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { formatDate, formatDateTime } from "../utils/dateUtils";
import { TUser } from "../types/User";
import ErrorSnackbar from "./ErrorSnackbar";

interface HeadCell {
  disablePadding: boolean;
  id: keyof TUser | "status" | "action";
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "balance",
    numeric: true,
    disablePadding: false,
    label: "Balance ($)",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "registerAt",
    numeric: false,
    disablePadding: false,
    label: "Registration",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "STATUS",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "ACTION",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TUser
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler =
    (property: keyof TUser) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all users",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => {
          const isSortable =
            headCell.id !== "status" && headCell.id !== "action";

          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={
                isSortable && orderBy === headCell.id ? order : false
              }
            >
              {isSortable ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id as keyof TUser)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              ) : (
                <Typography variant="body2" component="span">
                  {headCell.label}
                </Typography>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(
  props: EnhancedTableToolbarProps & {
    filterValues: {
      name: string;
      balance: string;
      email: string;
      registerAt: string;
    };
    onFilterChange: (
      prop: "balance" | "email" | "registerAt" | "name"
    ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
) {
  const { numSelected, filterValues, onFilterChange } = props;

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
          pt: 2,
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Users
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: 2, width: "100%", flexWrap: "wrap" }}>
        <TextField
          size="small"
          label="Filter by name"
          variant="outlined"
          value={filterValues.name}
          onChange={onFilterChange("name")}
          sx={{ minWidth: 200 }}
        />
        <TextField
          size="small"
          label="Filter by balance"
          variant="outlined"
          value={filterValues.balance}
          onChange={onFilterChange("balance")}
          sx={{ minWidth: 200 }}
        />
        <TextField
          size="small"
          label="Filter by email"
          variant="outlined"
          value={filterValues.email}
          onChange={onFilterChange("email")}
          sx={{ minWidth: 200 }}
        />
        <TextField
          size="small"
          label="Filter by registration"
          variant="outlined"
          value={filterValues.registerAt}
          onChange={onFilterChange("registerAt")}
          sx={{ minWidth: 200 }}
        />
      </Box>
    </Toolbar>
  );
}

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof TUser>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | Date | boolean },
  b: { [key in Key]: number | string | Date | boolean }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function UserTable() {
  const { users, loading, error } = useUsers();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof TUser>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  const [filterValues, setFilterValues] = React.useState<{
    name: string;
    balance: string;
    email: string;
    registerAt: string;
  }>({
    name: "",
    balance: "",
    email: "",
    registerAt: "",
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TUser
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleFilterChange =
    (prop: keyof typeof filterValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValues({ ...filterValues, [prop]: event.target.value });
      setPage(0); // Reset to first page when filtering
    };

  const visibleRows = React.useMemo(
    () =>
      [...users]
        .filter((user) => {
          return (
            user.name.toLowerCase().includes(filterValues.name.toLowerCase()) &&
            (filterValues.balance === "" ||
              user.balance.toString().includes(filterValues.balance)) &&
            user.email
              .toLowerCase()
              .includes(filterValues.email.toLowerCase()) &&
            (filterValues.registerAt === "" ||
              formatDate(user.registerAt).includes(filterValues.registerAt))
          );
        })
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, users, filterValues]
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {error && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {!error && (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            filterValues={filterValues}
            onFilterChange={handleFilterChange}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={users.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.balance}</TableCell>
                      <TableCell>
                        <Link
                          href={`mailto:${row.email}`}
                          color="inherit"
                          underline="hover"
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            textDecoration: "none",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {row.email}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          title={formatDateTime(row.registerAt)}
                          placement="top"
                          arrow
                        >
                          <span>{formatDate(row.registerAt)}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.active ? "Active" : "Inactive"}
                          color={row.active ? "success" : "error"}
                          size="small"
                          icon={
                            row.active ? (
                              <CheckCircleOutline />
                            ) : (
                              <CloseOutlined />
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={(e) => e.stopPropagation()}>
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={(e) => e.stopPropagation()}>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={headCells.length + 1} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      <ErrorSnackbar
        open={!!error && snackbarOpen}
        message={error || ""}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
}

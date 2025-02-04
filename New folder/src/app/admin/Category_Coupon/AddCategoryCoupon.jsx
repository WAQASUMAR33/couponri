"use client";

import React, { useState, useEffect } from "react";
import {
  Backdrop,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Button,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Box,
  Typography,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Autocomplete from "@mui/material/Autocomplete";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddCategoryCoupons = () => {
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    offerIds: [],
    status: "Normal", // Default value for status field
    meta_title: "",
    meta_description: "",
    meta_focusKeyword: "",
    web_slug: "",
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSubmit, setSnackbarSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteSuccessSnackbar, setDeleteSuccessSnackbar] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    id: null,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = (row) => {

    if (row && row.id) {
      setDeleteConfirmation({ open: true, id: row.id });
    } else {
      console.error("Invalid Category for deletion");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      modelClose();
      setLoading(true)
      const response = await fetch(
        `/api/category_coupon/${deleteConfirmation.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setDeleteSuccessSnackbar(true);
        setTimeout(() => {
          setDeleteSuccessSnackbar(false);
        }, 5000);
        setLoading(false)
        const updatedCategories = categories.filter(
          (category) => category.id !== deleteConfirmation.id
        );
        setCategories(updatedCategories);
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error.message);
    } finally {
      setDeleteConfirmation({ open: false, id: null });
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ open: false, id: null });
  };

  const modelClose = () => {
    setOpen(false);
    setEditingCategory(null);
    setFormData({
      id: "",
      name: "",
      offerIds: [],
      status: "Normal", // Reset status to default
      meta_title: "",
      meta_description: "",
      meta_focusKeyword: "",
      web_slug: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOffersChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData((prev) => ({
      ...prev,
      offerIds: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleOfferSelect = (event, value) => {
    // Set selected offer IDs from the selection
    setFormData((prev) => ({
      ...prev,
      offerIds: value.map((offer) => offer.id),
    }));
  };

  // const handleSearchChange = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   setSearchTerm(value);

  //   const filtered = value
  //     ? offers.filter((offer) => offer.offer_title.toLowerCase().includes(value))
  //     : offers;

  //   setFilteredOffers(filtered);
  // };

  // const handleSearchChange = (e) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);

  //   if (value) {
  //     const filtered = offers.filter((offer) =>
  //       offer.offer_title.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setFilteredOffers(filtered);
  //   } else {
  //     setFilteredOffers(offers);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.offerIds.length) {
      setSnackbarSubmit(true);
      setTimeout(() => {
        setSnackbarSubmit(false);
      }, 5000);
      setLoading(false);
      return;
    }

    try {
      const categoryToSubmit = {
        name: formData.name,
        offers: formData.offerIds,
        status: formData.status,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        meta_focusKeyword: formData.meta_focusKeyword,
        web_slug: formData.web_slug,
      };

      await axios.post('/api/category_coupon', categoryToSubmit);
      toast.success("Category has been added successfully!");
      modelClose();
      fetchData();
    } catch (error) {
      console.error("Error occurred during submission", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const categoryToUpdate = {
        name: formData.name,
        offers: formData.offerIds,
        status: formData.status,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        meta_focusKeyword: formData.meta_focusKeyword,
        web_slug: formData.web_slug,
      };

      console.log("data to update is : ",categoryToUpdate);
      await axios.put(`/api/category_coupon/${formData.id}`, categoryToUpdate);

      toast.success("Category has been updated successfully!");
      modelClose();
      fetchData();
    } catch (error) {
      console.error("Error occurred while updating the data:", error);
      toast.error("Failed to update the category");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (category) => {
    const offerIds = category.offer
      ? category.offer.split(",").map((id) => parseInt(id.trim(), 10))
      : [];
      setFormData({ id: category.id, name: category.name, offerIds, status: category.status, meta_title:category.meta_title, meta_description: category.meta_description, meta_focusKeyword: category.meta_focusKeyword, web_slug: category.web_slug || "Normal" });
    setEditingCategory(category);
    setOpen(true);
  };

  const router = useRouter();
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      alert("Login to see the dashboard!");
      router.push("/admin");
    } else {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const [categoriesResponse, offersResponse] = await Promise.all([
        fetch(`/api/category_coupon`),
        fetch(`/api/offers`),
      ]);

      if (!categoriesResponse.ok || !offersResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const categoriesData = await categoriesResponse.json();
      const offersData = await offersResponse.json();

      setCategories(categoriesData);
      setOffers(offersData);
      setFilteredOffers(offersData);
    } catch (error) {
      setError("Error fetching data: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Category Name",
        accessor: "name",
      },
      {
        Header: "Offers",
        accessor: "offer",
        Cell: ({ value }) => (value ? value.split(",").join(", ") : ""),
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Action",
        accessor: "updateButton",
        Cell: ({ row }) => (
          <div className="flex gap-6">
            <FaUserEdit
              onClick={() => handleOpen(row.original)}
              style={{
                fontSize: "26px",
                color: "#006a5c",
                paddingRight: "6px",
                cursor: "pointer",
              }}
            />
            {userRole !== "sub admin" && (
              <MdDeleteForever
                onClick={() => handleDelete(row.original)}
                style={{ fontSize: "26px", color: "#b03f37", cursor: "pointer" }}
              />
            )}
          </div>
        ),
      },
    ],
    [offers, userRole]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: categories,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  if (!mounted) return null;

  return (
    <Box sx={{ padding: 3 }} >
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Toolbar>
          <TextField
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
            placeholder="Search"
            variant="outlined"
            size="small"
          />
        </Toolbar>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditingCategory(null);
            setOpen(true);
          }}
          sx={{
            backgroundColor: "#E3B505",
            color: "black",
            ":hover": {
              backgroundColor: "#d3a004",
            },
          }}
        >
          ADD New
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      borderBottom: "2px solid #E3B505",
                    }}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.column.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: categories.length }]}
        colSpan={5}
        count={categories.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        showLastButton
        showFirstButton
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
      />

      {/* Add/Edit Category Coupon Dialog */}
      <Dialog open={open} onClose={modelClose} maxWidth="xl" fullWidth>
        <DialogTitle>
          <Typography variant="h6">
            {editingCategory ? "Edit Category Coupon" : "New Category Coupon"}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={modelClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={editingCategory ? handleEditSubmit : handleSubmit}>
            <Grid container spacing={2} padding={2}>
              <Grid item xs={12}>
                <TextField
                  label="Category Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={offers} 
                  getOptionLabel={(option) => `${option.id} - ${option.offer_title}`} 
                  value={offers.filter((offer) => formData.offerIds.includes(offer.id))}
                  onChange={handleOfferSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Offers"
                      placeholder="Search and add offers"
                    />
                  )}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        key={option.id}
                        label={`${option.id} - ${option.offer_title}`} 
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  filterOptions={(options, { inputValue }) => {
                    // Customize filtering logic to prioritize by position
                    return options
                      .filter((option) =>
                        option.offer_title.toLowerCase().includes(inputValue.toLowerCase())
                      )
                      .sort((a, b) => {
                        const titleA = a.offer_title.toLowerCase();
                        const titleB = b.offer_title.toLowerCase();
                        const input = inputValue.toLowerCase();
                        return titleA.indexOf(input) - titleB.indexOf(input);
                      });
                  }}
                  filterSelectedOptions
                />


              </Grid>
              {/* <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="select-offers-label">Offers</InputLabel>
                  <Select
                    labelId="select-offers-label"
                    id="select-offers"
                    multiple
                    value={formData.offerIds}
                    onChange={handleOffersChange}
                    input={<OutlinedInput label="Offers" />}
                    renderValue={(selected) =>
                      selected
                        .map((id) => {
                          const offer = offers.find((o) => o.id === id);
                          return offer ? offer.offer_title : "";
                        })
                        .join(", ")
                    }
                    MenuProps={MenuProps}
                  >
                    <MenuItem>
                      <TextField
                        autoFocus
                        placeholder="Search offers..."
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </MenuItem>
                   

                    {filteredOffers.map((offer) => (
                      <MenuItem key={offer.id} value={offer.id}>
                        <Checkbox checked={formData.offerIds.includes(offer.id)} />
                        <ListItemText primary={offer.offer_title} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    input={<OutlinedInput label="Status" />}
                  >
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="Featured">Featured</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
                            {/* Meta Title */}
                            <Grid item xs={12}>
                <TextField
                  label="Meta Title"
                  type="text"
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              {/* Meta Description */}
              <Grid item xs={12}>
                <TextField
                  label="Meta Description"
                  type="text"
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Grid>

              {/* Meta Focus Keyword */}
              <Grid item xs={12}>
                <TextField
                  label="Meta Focus Keyword"
                  type="text"
                  name="meta_focusKeyword"
                  value={formData.meta_focusKeyword}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              {/* Web Slug */}
              <Grid item xs={12}>
                <TextField
                  label="Web Slug"
                  type="text"
                  name="web_slug"
                  value={formData.web_slug}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

            </Grid>
            <DialogActions>
              <Button
                type="submit"
                disabled={loading}
                variant="contained"
                sx={{
                  backgroundColor: "#E3B505",
                  color: "black",
                  ":hover": {
                    backgroundColor: "#d3a004",
                  },
                }}
              >
                {`${loading ? "Loading..." : editingCategory ? "Update" : "Save"}`}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Snackbar and Delete Confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success">Category Coupon saved successfully!</Alert>
      </Snackbar>
      <Snackbar
        open={snackbarSubmit}
        autoHideDuration={5000}
        onClose={() => setSnackbarSubmit(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error">Please fill in all the required fields.</Alert>
      </Snackbar>
      <Snackbar
        open={deleteSuccessSnackbar}
        autoHideDuration={5000}
        onClose={() => setDeleteSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="warning">Category Coupon successfully deleted!</Alert>
      </Snackbar>

      <Dialog
        open={deleteConfirmation.open}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirmation-title"
      >
        <DialogTitle id="delete-confirmation-title">
          <Typography variant="h6">Confirm Deletion</Typography>
        </DialogTitle>
        <DialogContent>
          {deleteConfirmation.id && (
            <Typography variant="body1">
              Are you sure you want to delete the category coupon with ID{" "}
              {deleteConfirmation.id}?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddCategoryCoupons;

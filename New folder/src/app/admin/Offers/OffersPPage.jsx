"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Input,
  Button,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Typography,
  TextField,
} from "@mui/material";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

// Dynamically import the editor since it might use 'self' or 'window'
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const OffersPPage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]); // State for filtered offers
  const [companies, setCompanies] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteSuccessSnackbar, setDeleteSuccessSnackbar] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    id: null,
  });
  const [selectedCompany, setSelectedCompany] = useState(""); // State for selected company
  const router = useRouter();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Decode JWT token to get user role
    const token = Cookies.get("token");
    if (!token) {
      alert("Login to see the dashboard!");
      router.push("/admin");
    } else {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
      console.log("User Role:", decodedToken.role);
    }
  }, [router]);

  useEffect(() => {
    fetchOffers();
    fetchCompanies();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get("/api/offers");
      setOffers(response.data);
      setFilteredOffers(response.data); // Set filtered offers as well
    } catch (error) {
      console.error("Error fetching offers: ", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("/api/company");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies: ", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ open: false, id: null });
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/offers/${deleteConfirmation.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDeleteSuccessSnackbar(true);
        setTimeout(() => {
          setDeleteSuccessSnackbar(false);
        }, 5000);

        const updatedOffers = offers.filter(
          (offer) => offer.id !== deleteConfirmation.id
        );
        setOffers(updatedOffers);
        setFilteredOffers(updatedOffers); // Update filtered offers
      } else {
        console.error("Failed to delete offer");
      }
    } catch (error) {
      console.error("Error deleting offer:", error.message);
    } finally {
      setDeleteConfirmation({ open: false, id: null });
    }
  };

  const handleDelete = (row) => {
    if (row && row.id) {
      setDeleteConfirmation({ open: true, id: row.id });
    } else {
      console.error("Invalid Offer for deletion");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (editingOffer) {
      setEditingOffer((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [formData, setFormData] = useState({
    id: "",
    comp_id: "",
    offer_type: "Code", // Default value
    offer_status: "Normal", // Default value
    offer_title: "",
    offer_code: "",
    offer_description: "",
    offer_affiliateLink: "", // Added field
    offer_users: "",
    offer_expiry: "",
    offer_isverify: "Yes", // Default to "Yes"
    offer_details: "",
  });

  const handleAddOpen = () => {
    setFormData({
      id: "",
      comp_id: "",
      offer_type: "Code",
      offer_status: "Normal",
      offer_title: "",
      offer_code: "",
      offer_description: "",
      offer_affiliateLink: "",
      offer_users: "",
      offer_expiry: "",
      offer_isverify: "Yes",
      offer_details: "",
    });
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditOpen = (offer) => {
    setEditingOffer(offer);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingOffer(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = [
      "comp_id",
      "offer_type",
      "offer_status",
      "offer_title",
      "offer_code",
      "offer_description",
      "offer_affiliateLink", // Added field
      "offer_users",
      "offer_expiry",
      "offer_isverify",
    ];

    const isFormValid = requiredFields.every(
      (field) => formData[field] && formData[field].trim() !== ""
    );

    if (!isFormValid) {
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 5000);
      setLoading(false);
      return;
    }

    try {
      const submitData = {
        ...formData,
        comp_id: parseInt(formData.comp_id),
      };

      console.log("Submit daata: ", submitData);

      await axios.post("/api/offers", submitData);
      toast.success("Record has been added successfully!");
      setLoading(false);
      handleAddClose();
      fetchOffers();
    } catch (error) {
      console.error(
        "Error occurred while sending data to the API",
        error.response || error
      );
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = [
      "comp_id",
      "offer_type",
      "offer_status",
      "offer_title",
      "offer_code",
      "offer_description",
      "offer_affiliateLink", // Added field
      "offer_users",
      "offer_expiry",
      "offer_isverify",
    ];

    const isFormValid = requiredFields.every(
      (field) =>
        editingOffer[field] !== undefined &&
        editingOffer[field].toString().trim() !== ""
    );

    if (!isFormValid) {
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 5000);
      setLoading(false);
      return;
    }

    try {
      const submitData = {
        ...editingOffer,
        comp_id: parseInt(editingOffer.comp_id),
      };

      console.log("Submit daata: ", submitData);
      await axios.put(`/api/offers/${editingOffer.id}`, submitData);
      toast.success("Record has been updated successfully!");
      setLoading(false);
      handleEditClose();
      fetchOffers();
    } catch (error) {
      console.error(
        "Error occurred while updating the data:",
        error.response || error
      );
      toast.error("Failed to update the record");
      setLoading(false);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Company",
        accessor: "comp_id",
        Cell: ({ value }) => {
          const company = companies.find((c) => c.id === value);
          return company ? company.com_title : "Unknown";
        },
      },
      {
        Header: "Offer Title",
        accessor: "offer_title",
      },
      {
        Header: "Offer Type",
        accessor: "offer_type",
      },
      {
        Header: "Offer Status",
        accessor: "offer_status",
      },
      {
        Header: "Offer Code",
        accessor: "offer_code",
      },
      {
        Header: "Offer Expiry",
        accessor: "offer_expiry",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex gap-6">
            <FaUserEdit
              onClick={() => handleEditOpen(row.original)}
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
    [companies, userRole]
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
    setPageSize,
  } = useTable(
    {
      columns,
      data: filteredOffers.length > 0 ? filteredOffers : offers, // Use filteredOffers here
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  const handleCompaniesChange = (e) => {
    const companyId = e.target.value;
    setSelectedCompany(companyId);

    // If "All Companies" is selected, reset the filtered offers
    if (companyId === "") {
      setFilteredOffers(offers);
    } else {
      // Filter offers based on selected company
      const filtered = offers.filter((offer) => offer.comp_id === parseInt(companyId));
      setFilteredOffers(filtered);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Toolbar>
          <Input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
            placeholder={`Search`}
          />
        </Toolbar>
        <Button
          style={{
            height: "40px",
            backgroundColor: "#E3B505",
            color: "black",
          }}
          onClick={handleAddOpen}
        >
          ADD New
        </Button>
      </div>

      <FormControl fullWidth margin="normal">
        <InputLabel id="company-filter-label">Filter by Companies</InputLabel>
        <Select
          labelId="company-filter-label"
          value={selectedCompany}
          onChange={handleCompaniesChange}
          label="Filter by Company"
        >
          <MenuItem value="">
            <em>All Companies</em>
          </MenuItem>
          {companies.map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.com_title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper} {...getTableProps()}>
        <Table>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
            {filteredOffers.length === 0 && selectedCompany && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No offers available for this company.
                </TableCell>
              </TableRow>
            )}
            {page.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No offers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: offers.length }]}
        count={filteredOffers.length} // Use the length of filtered offers
        rowsPerPage={pageSize}
        page={pageIndex}
        showLastButton={true}
        showFirstButton={true}
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
      />

      {/* Add Offer Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleAddClose}
        fullWidth={true}
        maxWidth="xl"
        disableEnforceFocus
      >
        <DialogTitle>Add New Offer</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <h3>Select Company</h3>
            <select
              value={formData.comp_id}
              onChange={handleInputChange}
              name="comp_id"
              style={{ marginTop: "10px", width: "100%", padding: "10px" }}
            >
              <option key={0} value="">
                Select Company
              </option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.com_title}
                </option>
              ))}
            </select>

            <h3>Offer Type</h3>
            <select
              name="offer_type"
              value={formData.offer_type}
              onChange={handleInputChange}
              style={{ marginTop: "10px", width: "100%", padding: "10px" }}
            >
              <option value="Code">Code</option>
              <option value="Offer">Offer</option>
            </select>

            <h3>Offer Status</h3>
            <select
              name="offer_status"
              value={formData.offer_status}
              onChange={handleInputChange}
              style={{ marginTop: "10px", width: "100%", padding: "10px" }}
            >
              <option value="Normal">Normal</option>
              <option value="Hot">Hot</option>
              <option value="Trending">Trending</option>
              <option value="Best Selling">Best Selling</option>
            </select>

            <TextField
              label="Offer Title"
              name="offer_title"
              value={formData.offer_title}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px" }}
            />
            <TextField
              label="Offer Code"
              name="offer_code"
              value={formData.offer_code}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px" }}
            />
            <TextField
              label="Offer Description"
              name="offer_description"
              value={formData.offer_description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              style={{ marginTop: "20px" }}
            />
            <TextField
              label="Affiliate Link"
              name="offer_affiliateLink"
              value={formData.offer_affiliateLink}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px" }}
            />
            <TextField
              label="Offer Users"
              name="offer_users"
              value={formData.offer_users}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px" }}
            />
            <TextField
              label="Offer Expiry"
              name="offer_expiry"
              type="date"
              value={formData.offer_expiry}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginTop: "20px" }}
            />
            <h3>Is Verify</h3>
            <select
              name="offer_isverify"
              value={formData.offer_isverify}
              onChange={handleInputChange}
              style={{ marginTop: "10px", width: "100%", padding: "10px" }}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <Typography variant="subtitle1" style={{ marginTop: "20px" }}>
              Offer Details
            </Typography>
            <JoditEditor
              ref={editor}
              value={formData.offer_details}
              tabIndex={1}
              onBlur={(newContent) =>
                setFormData({ ...formData, offer_details: newContent })
              }
              onChange={() => {}}
            />
            <DialogActions>
              <Button onClick={handleAddClose} color="primary" variant="outlined">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                variant="contained"
                style={{ backgroundColor: "#E3B505", color: "black" }}
              >
                {loading ? "Loading...." : "Save"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Offer Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditClose}
        fullWidth={true}
        maxWidth="xl"
        disableEnforceFocus
      >
        <DialogTitle>Edit Offer</DialogTitle>
        <DialogContent>
          {editingOffer && (
            <form>
              <h3>Select Company</h3>
              <select
                name="comp_id"
                value={editingOffer.comp_id}
                onChange={handleInputChange}
                style={{ marginTop: "10px", width: "100%", padding: "10px" }}
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.com_title}
                  </option>
                ))}
              </select>

              <h3>Offer Type</h3>
              <select
                name="offer_type"
                value={editingOffer.offer_type}
                onChange={handleInputChange}
                style={{ marginTop: "10px", width: "100%", padding: "10px" }}
              >
                <option value="Code">Code</option>
                <option value="Offer">Offer</option>
              </select>

              <h3>Offer Status</h3>
              <select
                name="offer_status"
                value={editingOffer.offer_status}
                onChange={handleInputChange}
                style={{ marginTop: "10px", width: "100%", padding: "10px" }}
              >
                <option value="Normal">Normal</option>
                <option value="Hot">Hot</option>
                <option value="Trending">Trending</option>
                <option value="Best Selling">Best Selling</option>
              </select>

              <TextField
                label="Offer Title"
                name="offer_title"
                value={editingOffer.offer_title}
                onChange={handleInputChange}
                fullWidth
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Offer Code"
                name="offer_code"
                value={editingOffer.offer_code}
                onChange={handleInputChange}
                fullWidth
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Offer Description"
                name="offer_description"
                value={editingOffer.offer_description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Affiliate Link"
                name="offer_affiliateLink"
                value={editingOffer.offer_affiliateLink}
                onChange={handleInputChange}
                fullWidth
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Offer Users"
                name="offer_users"
                value={editingOffer.offer_users}
                onChange={handleInputChange}
                fullWidth
                style={{ marginTop: "20px" }}
              />
              <TextField
                label="Offer Expiry"
                name="offer_expiry"
                type="date"
                value={editingOffer.offer_expiry}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginTop: "20px" }}
              />
              <h3>Is Verify</h3>
              <select
                name="offer_isverify"
                value={editingOffer.offer_isverify}
                onChange={handleInputChange}
                style={{ marginTop: "10px", width: "100%", padding: "10px" }}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              <Typography variant="subtitle1" style={{ marginTop: "20px" }}>
                Offer Details
              </Typography>
              <JoditEditor
                ref={editor}
                value={editingOffer.offer_details}
                tabIndex={1}
                onBlur={(newContent) =>
                  setEditingOffer({ ...editingOffer, offer_details: newContent })
                }
                onChange={() => {}}
              />
              <DialogActions>
                <Button onClick={handleEditClose} color="primary" variant="outlined">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleEdit}
                  disabled={loading}
                  style={{ backgroundColor: "#E3B505", color: "black" }}
                >
                  {loading ? "Loading...." : "Save"}
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
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
        <Alert severity="warning">Offer successfully deleted!</Alert>
      </Snackbar>

      <Dialog
        open={deleteConfirmation.open}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <DialogTitle id="delete-confirmation-title">
          <Typography variant="h6" component="div">
            Confirm Deletion
          </Typography>
        </DialogTitle>
        <DialogContent>
          {deleteConfirmation.id && (
            <Typography variant="body1">
              Are you sure you want to delete the offer with ID{" "}
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
    </div>
  );
};

export default OffersPPage;

import React, { useState, useEffect } from "react";
import {
  ActionIcon,
  Card,
  Center,
  Flex,
  Loader,
  MantineProvider,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { MantineReactTable } from "mantine-react-table";
import AuthRequest from "../../APIRequest/AuthRequest";
import LazyLoader from "../../components/Common/LazyLoader";
import { IconEdit } from "@tabler/icons-react";
import { useSelector } from "react-redux";

const ListallStudents = () => {
  const [tableData, setTableData] = useState([]);
  const [loader, setloader] = useState(true);
  const { UserDetails, role } = useSelector((state) => state.User);
  const navigate = useNavigate();
  const EditingStudent = (studentId) => {
 
    navigate("/edit-student", { state: studentId });
  };

  const fetchStudentData = async () => {
    try {
      // Await the asynchronous API call
      const response = await AuthRequest.Getallstudent();

      if (response.status === 200) {
        // Handle successful response
        setTableData(response.data?.data);
        setloader(false);
      } else {
        // Handle non-200 response or errors
        setloader(false);
        console.error("Error fetching student data", response);
      }
    } catch (error) {
      setloader(false);
      console.error("Error during API call", error);
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchStudentData();
  }, []);

  // Define the columns for the table
  const columns = [
    
    ...(role === 'ADMIN' ? [{
      id: "actions", // A unique ID for the column
      header: "Actions",
      size: 100, // Optional: adjust width of the column
      enableSorting: false, // Disable sorting for this column if needed
      enableColumnFilter: false, // Disable filtering for this column
      columnDefType: "actions", // You can define this type to recognize it's for actions
      Cell: ({ row }) => (
        <Flex gap="xs">
          <Tooltip label="Edit">
            <ActionIcon onClick={() => EditingStudent(row.original.studentId)}>
              <IconEdit />
            </ActionIcon>
          </Tooltip>
        </Flex>
      ),
    }] : []),
    {
      accessorKey: "studentId",
      size: 100,
      header: "SIN No",
    },
    {
      accessorKey: "fullname",
      header: "Full Name",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "surname",
      header: "Surname",
    },
    {
      accessorKey: "dept",
      header: "Department",
    },
    {
      accessorKey: "batch",
      header: "Batch",
    },
    {
      accessorKey: "mobileNumber",
      header: "Mobile",
    },

    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
    },

    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "area",
      header: "Area",
    },
    {
      accessorKey: "state",
      header: "State",
    },
    {
      accessorKey: "district",
      header: "District",
    },
    {
      accessorKey: "talukaCity",
      header: "Taluka/City",
    },
    {
      accessorKey: "townVillage",
      header: "Town/Village",
    },
    {
      accessorKey: "pincode",
      header: "Pincode",
    },
    {
      accessorKey: "religion",
      header: "Religion",
    },
    {
      accessorKey: "college",
      header: "College",
    },
    {
      accessorKey: "sevenFiveSCH",
      header: "75% Scholarship",
    },
    {
      accessorKey: "fg",
      header: "First Generation",
    },
    {
      accessorKey: "postMatric",
      header: "Post Matric",
    },
    {
      accessorKey: "fatherId",
      header: "Father ID",
    },
    {
      accessorKey: "fatherFirstName",
      header: "Father First Name",
    },
    {
      accessorKey: "fatherDateOfBirth",
      header: "Father Date of Birth",
    },
    {
      accessorKey: "fatherEmail",
      header: "Father Email",
    },
    {
      accessorKey: "fatherPrimaryMobileNo",
      header: "Father Primary Mobile No",
    },
    {
      accessorKey: "fatherSecondaryMobileNo",
      header: "Father Secondary Mobile No",
    },
    {
      accessorKey: "fatherAddressLine1",
      header: "Father Address Line 1",
    },
    {
      accessorKey: "fatherArea",
      header: "Father Area",
    },
    {
      accessorKey: "fatherTownVillage",
      header: "Father Town/Village",
    },
    {
      accessorKey: "fatherPincode",
      header: "Father Pincode",
    },
    {
      accessorKey: "fatherProfession",
      header: "Father Profession",
    },
    {
      accessorKey: "fatherIncome",
      header: "Father Income",
    },

    {
      accessorKey: "motherFirstName",
      header: "Mother First Name",
    },
    {
      accessorKey: "motherDateOfBirth",
      header: "Mother Date of Birth",
    },
    {
      accessorKey: "motherEmail",
      header: "Mother Email",
    },
    {
      accessorKey: "motherPrimaryMobileNo",
      header: "Mother Primary Mobile No",
    },
    {
      accessorKey: "motherSecondaryMobileNo",
      header: "Mother Secondary Mobile No",
    },
    {
      accessorKey: "motherAddressLine1",
      header: "Mother Address Line 1",
    },
    {
      accessorKey: "motherArea",
      header: "Mother Area",
    },
    {
      accessorKey: "motherTownVillage",
      header: "Mother Town/Village",
    },
    {
      accessorKey: "motherPincode",
      header: "Mother Pincode",
    },
    {
      accessorKey: "motherProfession",
      header: "Mother Profession",
    },
    {
      accessorKey: "motherIncome",
      header: "Mother Income",
    },

    {
      accessorKey: "guardianFirstName",
      header: "Guardian First Name",
    },
    {
      accessorKey: "guardianGender",
      header: "Guardian Gender",
    },
    {
      accessorKey: "guardianDateOfBirth",
      header: "Guardian Date of Birth",
    },
    {
      accessorKey: "guardianEmail",
      header: "Guardian Email",
    },
    {
      accessorKey: "guardianPrimaryMobileNo",
      header: "Guardian Primary Mobile No",
    },
    {
      accessorKey: "guardianSecondaryMobileNo",
      header: "Guardian Secondary Mobile No",
    },
    {
      accessorKey: "guardianAddressLine1",
      header: "Guardian Address Line 1",
    },
    {
      accessorKey: "guardianArea",
      header: "Guardian Area",
    },
    {
      accessorKey: "guardianTownVillage",
      header: "Guardian Town/Village",
    },
    {
      accessorKey: "guardianPincode",
      header: "Guardian Pincode",
    },
    {
      accessorKey: "guardianRelationWithStudent",
      header: "Relation with Guardian",
    },
    {
      accessorKey: "guardianProfession",
      header: "Guardian Profession",
    },
    {
      accessorKey: "guardianIncome",
      header: "Guardian Income",
    },
    {
      accessorKey: "bloodGroup",
      header: "Blood Group",
    },
    {
      accessorKey: "schoolType",
      header: "School Type",
    },
    {
      accessorKey: "schoolName",
      header: "School Name",
    },
    {
      accessorKey: "medium",
      header: "Medium",
    },
    {
      accessorKey: "languagesKnown",
      header: "Languages Known",
    },
    {
      accessorKey: "foreignLanguagesKnown",
      header: "Foreign Languages Known",
    },
    {
      accessorKey: "aadharNo",
      header: "Aadhar No",
    },
    {
      accessorKey: "emisNo",
      header: "EMIS No",
    },

    {
      accessorKey: "tenthpassoutyear",
      header: "10th Completion year",
    },
    {
      accessorKey: "twelethpassoutyear",
      header: "12th Completion year",
    },
    {
      accessorKey: "tenthMark",
      header: "10th Mark",
    },
    {
      accessorKey: "twelfthMarkPercent",
      header: "12th Mark Percent",
    },
    {
      accessorKey: "twelfthMathsMarkOutOf100",
      header: "12th Maths Mark",
    },
    {
      accessorKey: "twelfthPhysicsMarkOutOf100",
      header: "12th Physics Mark",
    },
    {
      accessorKey: "twelfthChemistryMarkOutOf100",
      header: "12th Chemistry Mark",
    },
    {
      accessorKey: "twelfthBilologyMarkOutOf100",
      header: "12th Biology Mark",
    },
    {
      accessorKey: "twelfthBotanyMarkOutOf100",
      header: "12th Botany Mark",
    },
    {
      accessorKey: "twelfthZoologyMarkOutOf100",
      header: "12th Zoology Mark",
    },
    {
      accessorKey: "twelfthCompScienceMarkOutOf100",
      header: "12th Computer Science Mark",
    },
    {
      accessorKey: "community",
      header: "Community",
    },
    {
      accessorKey: "panCard",
      header: "PAN Card",
    },
    {
      accessorKey: "passportNumber",
      header: "Passport Number",
    },
    {
      accessorKey: "hostelStudent",
      header: "Hostel Student",
    },
    {
      accessorKey: "whatsappNumber",
      header: "WhatsApp Number",
    },
    {
      accessorKey: "visitorName",
      header: "Visitor Name",
    },
    {
      accessorKey: "visitorRelation",
      header: "Visitor Relation",
    },
    {
      accessorKey: "visitorAadhar",
      header: "Visitor Aadhar",
    },
    {
      accessorKey: "visitorPAN",
      header: "Visitor PAN",
    },
    {
      accessorKey: "visitorPhone",
      header: "Visitor Phone",
    },
    {
      accessorKey: "visitorDOB",
      header: "Visitor DOB",
    },
    {
      accessorKey: "visitorAddress",
      header: "Visitor Address",
    },
    {
      accessorKey: "foodPreference",
      header: "Food Preference",
    },
    {
      accessorKey: "bankDetails",
      header: "Bank Details",
    },

    {
      accessorKey: "updated_on",
      header: "Updated On",
    },
  ];

  const [columnSearchTerm, setColumnSearchTerm] = useState("");

  const filteredColumns = columns.filter((column) => {
    const isMatchingSearchTerm =
      column.header.toLowerCase().includes(columnSearchTerm.toLowerCase());

    // Include Actions and Student ID columns regardless of search term
   // Include "Student ID" and "Actions" always
   if (column.accessorKey === 'studentId' || column.accessorKey === 'actions') {
    return true;
  }

  // Include other columns based on the search term
  return isMatchingSearchTerm;
  });

  return (
    <>
      <MantineProvider>
        <>
        {/*   <TextInput
            placeholder="Search columns..."
            value={columnSearchTerm}
            onChange={(e) => setColumnSearchTerm(e.target.value)}
          /> */}

          <Card style={{ fontWeight: 800, fontSize: 16, margin: "10px" }}>
            Students List
          </Card>
          {loader ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                top: "30px",
              }}
            >
              <Loader color="green" variant="dots" />
            </div>
          ) : (
            <>
              <MantineReactTable
                columns={filteredColumns}
                data={tableData} // Pass the fetched student data here
                enableSorting={true}
                enableColumnFilters={true}
               
                enableGlobalFilter={true}
                enablePagination={true}
                enableStickyHeader={true}
                enablePinning={true}
                initialState={{
                  pagination: { pageSize: 10 },
                  columnPinning: {
                    left: ["actions", "studentId"],
                  },
                  showColumnFilters: true,
                 
                  density: "xs",
                }}
              />
            </>
          )}
        </>
      </MantineProvider>
    </>
  );
};

export default ListallStudents;

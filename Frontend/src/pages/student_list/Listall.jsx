import React, { useState, useEffect } from "react";
import {
  Card,
  MantineProvider,
} from "@mantine/core";
import { MantineReactTable } from 'mantine-react-table';
import AuthRequest from "../../APIRequest/AuthRequest";

const ListallStudents = () => {
  const [tableData, setTableData] = useState([]);

  // Function to fetch student data
  const fetchStudentData = async () => {
    try {
      // Await the asynchronous API call
      const response = await AuthRequest.Getallstudent();

      if (response.status === 200) {
        // Handle successful response
        setTableData(response.data?.data);
      } else {
        // Handle non-200 response or errors
        console.error("Error fetching student data", response);
      }
    } catch (error) {
      console.error("Error during API call", error);
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchStudentData();
  }, []);

  // Define the columns for the table
  const columns = [
    {
      accessorKey: 'studentId',
      header: 'SIN No',
    },
    {
      accessorKey: 'fullname',
      header: 'Full Name',
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'surname',
      header: 'Surname',
    },
    {
      accessorKey: 'dept',
      header: 'Department',
    },
    {
      accessorKey: 'batch',
      header: 'Batch',
    },
    {
      accessorKey: 'mobileNumber',
      header: 'Mobile',
    },
   
    {
      accessorKey: 'gender',
      header: 'Gender',
    },
    {
      accessorKey: 'dateOfBirth',
      header: 'Date of Birth',
    },
  
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'address',
      header: 'Address',
    },
    {
      accessorKey: 'area',
      header: 'Area',
    },
    {
      accessorKey: 'state',
      header: 'State',
    },
    {
      accessorKey: 'district',
      header: 'District',
    },
    {
      accessorKey: 'talukaCity',
      header: 'Taluka/City',
    },
    {
      accessorKey: 'townVillage',
      header: 'Town/Village',
    },
    {
      accessorKey: 'pincode',
      header: 'Pincode',
    },
    {
      accessorKey: 'religion',
      header: 'Religion',
    },
    {
      accessorKey: 'college',
      header: 'College',
    },
    {
      accessorKey: 'sevenFiveSCH',
      header: '75% Scholarship',
    },
    {
      accessorKey: 'fg',
      header: 'First Generation',
    },
    {
      accessorKey: 'postMatric',
      header: 'Post Matric',
    },
    {
      accessorKey: 'fatherId',
      header: 'Father ID',
    },
    {
      accessorKey: 'fatherFirstName',
      header: 'Father First Name',
    },
    {
      accessorKey: 'fatherDateOfBirth',
      header: 'Father Date of Birth',
    },
    {
      accessorKey: 'fatherEmail',
      header: 'Father Email',
    },
    {
      accessorKey: 'fatherPrimaryMobileNo',
      header: 'Father Primary Mobile No',
    },
    {
      accessorKey: 'fatherSecondaryMobileNo',
      header: 'Father Secondary Mobile No',
    },
    {
      accessorKey: 'fatherAddressLine1',
      header: 'Father Address Line 1',
    },
    {
      accessorKey: 'fatherArea',
      header: 'Father Area',
    },
    {
      accessorKey: 'fatherTownVillage',
      header: 'Father Town/Village',
    },
    {
      accessorKey: 'fatherPincode',
      header: 'Father Pincode',
    },
    {
      accessorKey: 'fatherProfession',
      header: 'Father Profession',
    },
    {
      accessorKey: 'fatherIncome',
      header: 'Father Income',
    },
   
    {
      accessorKey: 'motherFirstName',
      header: 'Mother First Name',
    },
    {
      accessorKey: 'motherDateOfBirth',
      header: 'Mother Date of Birth',
    },
    {
      accessorKey: 'motherEmail',
      header: 'Mother Email',
    },
    {
      accessorKey: 'motherPrimaryMobileNo',
      header: 'Mother Primary Mobile No',
    },
    {
      accessorKey: 'motherSecondaryMobileNo',
      header: 'Mother Secondary Mobile No',
    },
    {
      accessorKey: 'motherAddressLine1',
      header: 'Mother Address Line 1',
    },
    {
      accessorKey: 'motherArea',
      header: 'Mother Area',
    },
    {
      accessorKey: 'motherTownVillage',
      header: 'Mother Town/Village',
    },
    {
      accessorKey: 'motherPincode',
      header: 'Mother Pincode',
    },
    {
      accessorKey: 'motherProfession',
      header: 'Mother Profession',
    },
    {
      accessorKey: 'motherIncome',
      header: 'Mother Income',
    },
   
    {
      accessorKey: 'guardianFirstName',
      header: 'Guardian First Name',
    },
    {
      accessorKey: 'guardianGender',
      header: 'Guardian Gender',
    },
    {
      accessorKey: 'guardianDateOfBirth',
      header: 'Guardian Date of Birth',
    },
    {
      accessorKey: 'guardianEmail',
      header: 'Guardian Email',
    },
    {
      accessorKey: 'guardianPrimaryMobileNo',
      header: 'Guardian Primary Mobile No',
    },
    {
      accessorKey: 'guardianSecondaryMobileNo',
      header: 'Guardian Secondary Mobile No',
    },
    {
      accessorKey: 'guardianAddressLine1',
      header: 'Guardian Address Line 1',
    },
    {
      accessorKey: 'guardianArea',
      header: 'Guardian Area',
    },
    {
      accessorKey: 'guardianTownVillage',
      header: 'Guardian Town/Village',
    },
    {
      accessorKey: 'guardianPincode',
      header: 'Guardian Pincode',
    },
    {
      accessorKey: 'guardianRelationWithStudent',
      header: 'Relation with Guardian',
    },
    {
      accessorKey: 'guardianProfession',
      header: 'Guardian Profession',
    },
    {
      accessorKey: 'guardianIncome',
      header: 'Guardian Income',
    },
    {
      accessorKey: 'bloodGroup',
      header: 'Blood Group',
    },
    {
      accessorKey: 'schoolType',
      header: 'School Type',
    },
    {
      accessorKey: 'schoolName',
      header: 'School Name',
    },
    {
      accessorKey: 'medium',
      header: 'Medium',
    },
    {
      accessorKey: 'languagesKnown',
      header: 'Languages Known',
    },
    {
      accessorKey: 'foreignLanguagesKnown',
      header: 'Foreign Languages Known',
    },
    {
      accessorKey: 'aadharNo',
      header: 'Aadhar No',
    },
    {
      accessorKey: 'emisNo',
      header: 'EMIS No',
    },
    {
      accessorKey: 'tenthMark',
      header: '10th Mark',
    },
    {
      accessorKey: 'twelfthMarkPercent',
      header: '12th Mark Percent',
    },
    {
      accessorKey: 'twelfthMathsMarkOutOf100',
      header: '12th Maths Mark',
    },
    {
      accessorKey: 'twelfthPhysicsMarkOutOf100',
      header: '12th Physics Mark',
    },
    {
      accessorKey: 'twelfthChemistryMarkOutOf100',
      header: '12th Chemistry Mark',
    },
    {
      accessorKey: 'twelfthBilologyMarkOutOf100',
      header: '12th Biology Mark',
    },
    {
      accessorKey: 'twelfthBotanyMarkOutOf100',
      header: '12th Botany Mark',
    },
    {
      accessorKey: 'twelfthZoologyMarkOutOf100',
      header: '12th Zoology Mark',
    },
    {
      accessorKey: 'twelfthCompScienceMarkOutOf100',
      header: '12th Computer Science Mark',
    },
    {
      accessorKey: 'community',
      header: 'Community',
    },
    {
      accessorKey: 'panCard',
      header: 'PAN Card',
    },
    {
      accessorKey: 'passportNumber',
      header: 'Passport Number',
    },
    {
      accessorKey: 'hostelStudent',
      header: 'Hostel Student',
    },
    {
      accessorKey: 'whatsappNumber',
      header: 'WhatsApp Number',
    },
    {
      accessorKey: 'visitorName',
      header: 'Visitor Name',
    },
    {
      accessorKey: 'visitorRelation',
      header: 'Visitor Relation',
    },
    {
      accessorKey: 'visitorAadhar',
      header: 'Visitor Aadhar',
    },
    {
      accessorKey: 'visitorPAN',
      header: 'Visitor PAN',
    },
    {
      accessorKey: 'visitorPhone',
      header: 'Visitor Phone',
    },
    {
      accessorKey: 'visitorDOB',
      header: 'Visitor DOB',
    },
    {
      accessorKey: 'visitorAddress',
      header: 'Visitor Address',
    },
    {
      accessorKey: 'foodPreference',
      header: 'Food Preference',
    },
    {
      accessorKey: 'bankDetails',
      header: 'Bank Details',
    },
    
    
    {
      accessorKey: 'updated_on',
      header: 'Updated On',
    }
  ];
  

  return (
  
    <MantineProvider>
        <Card style={{fontWeight:800, fontSize:16,margin:'10px'}}> Students List</Card>
      <MantineReactTable
        columns={columns}
        data={tableData} // Pass the fetched student data here
        enableSorting
        enableGlobalFilter
        enablePagination
        enableStickyHeader
        initialState={{
          pagination: { pageSize: 10 },
          density: 'xs'
        }}
        
      />
    </MantineProvider>
  );
};

export default ListallStudents;

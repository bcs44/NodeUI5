define({ "api": [
  {
    "type": "post",
    "url": "/consultation",
    "title": "Insert a new Consultation",
    "group": "Consultations",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"idPat\": \"2\",\n  \"namePat\": Bruna\n  \"speciality\": \"Dentist\",\n  \"time\": \"12:15:00\"\n  \"date\": \"02/03/2019\",\n  \"observations\": \"Electrocardiogram done\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Insert a new Consultation (Used on CreateConsultations.onCreateConsultations())</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Success",
            "description": "<p>New Consultation inserted</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/consultations.js",
    "groupTitle": "Consultations",
    "name": "PostConsultation"
  },
  {
    "type": "get",
    "url": "/consultation/:id",
    "title": "Get a consultation by Id",
    "name": "consultation",
    "group": "Consultations",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Consultation's Id</p>"
          }
        ]
      }
    },
    "description": "<p>Get a Consultation by Id (Used on Details.getData())</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "idPat",
            "description": "<p>Patient's ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "namePat",
            "description": "<p>Patient's Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "speciality",
            "description": "<p>Consultation's Speciality</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>Consultation's Time</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Consultation's Date</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/consultations.js",
    "groupTitle": "Consultations"
  },
  {
    "type": "get",
    "url": "/doctorLogin/:email/:password",
    "title": "Get Doctor",
    "group": "Doctors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Doctor's Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Doctor's Password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Doctor's ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Doctor's Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Doctor's Password</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Doctor's Email</p>"
          }
        ]
      }
    },
    "description": "<p>Log in and sign in to the app (Used on Login.onLogin())</p>",
    "version": "0.0.0",
    "filename": "./routes/doctors.js",
    "groupTitle": "Doctors",
    "name": "GetDoctorloginEmailPassword"
  },
  {
    "type": "post",
    "url": "/doctor",
    "title": "Post a new record for a new doctor",
    "name": "doctor",
    "group": "Doctors",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": \"2\",\n  \"name\": Joaquim\n  \"password\": \"password\",\n  \"email\": \"joaquim@mail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Post a new record for a new doctor (Used on RegisterPage.onRegister())</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>New Doctor Inserted</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/doctors.js",
    "groupTitle": "Doctors"
  },
  {
    "type": "get",
    "url": "/lastDoctor",
    "title": "Request last Doctor information",
    "name": "lastDoctor",
    "group": "Doctors",
    "description": "<p>Receive information from the last doctor registered for the next one to be registered with the following ID. (Used on RegisterPage._getLastId())</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the last registered doctor found.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the last registered doctor found.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the last registered doctor found.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the last registered doctor found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/doctors.js",
    "groupTitle": "Doctors"
  },
  {
    "type": "delete",
    "url": "/patient/:id",
    "title": "Delete Patient by Id",
    "group": "Patients",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Patient's id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Success",
            "description": "<p>Patient Deleted</p>"
          }
        ]
      }
    },
    "description": "<p>Delete Patient by Id (Used on LadingPage.handlebtn_Delete())</p>",
    "version": "0.0.0",
    "filename": "./routes/patients.js",
    "groupTitle": "Patients",
    "name": "DeletePatientId"
  },
  {
    "type": "post",
    "url": "/patient",
    "title": "Insert a new Patient",
    "group": "Patients",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": \"2\",\n  \"name\": Bruna\n  \"dob\": \"16/04/1995\",\n  \"gender\": \"Female\"\n  \"designation\": \"Asthmatic Patient\",\n  \"doctor\": 2\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Success",
            "description": "<p>Inserted new Patient</p>"
          }
        ]
      }
    },
    "description": "<p>Insert a new Patient (Used on LadingPage.handleOperationBtncreate())</p>",
    "version": "0.0.0",
    "filename": "./routes/patients.js",
    "groupTitle": "Patients",
    "name": "PostPatient"
  },
  {
    "type": "put",
    "url": "/patient/:id",
    "title": "Modify a Patient by Id",
    "group": "Patients",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Patients's Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": \"2\",\n  \"name\": Bruna\n  \"dob\": \"16/04/1995\",\n  \"gender\": \"Female\"\n  \"designation\": \"Asthmatic Patient\",\n  \"doctor\": 2\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Success",
            "description": "<p>Patient Modified</p>"
          }
        ]
      }
    },
    "description": "<p>Modify a Patient by Id (Used on LadingPage.handlebtn_Save())</p>",
    "version": "0.0.0",
    "filename": "./routes/patients.js",
    "groupTitle": "Patients",
    "name": "PutPatientId"
  },
  {
    "type": "get",
    "url": "/lastPatient",
    "title": "Get information from the last Patient registered.",
    "name": "lastPatient",
    "group": "Patients",
    "description": "<p>Receive information from the last Patient registered for the next one to be registered with the following ID. (Used on LadingPage._getLastId())</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Patient's ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Patient's Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>Patient's Date of Birthday</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Patient's Gender</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "designation",
            "description": "<p>Patient's Designation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "doctor",
            "description": "<p>Doctor's ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/patients.js",
    "groupTitle": "Patients"
  },
  {
    "type": "get",
    "url": "/patient/:id",
    "title": "Get a Patient by Id",
    "name": "patient",
    "group": "Patients",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Patients's Id</p>"
          }
        ]
      }
    },
    "description": "<p>Get a Patient by Id (Used on LadingPage.handleSearch())</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Patient's ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Patient's Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>Patient's Date of Birthday</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Patient's Gender</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "designation",
            "description": "<p>Patient's Designation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "doctor",
            "description": "<p>Doctor's ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/patients.js",
    "groupTitle": "Patients"
  },
  {
    "type": "get",
    "url": "/patientByDoctor/:doctor",
    "title": "Get Patient by Doctor's Id.",
    "name": "patientByDoctor",
    "group": "Patients",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "doctor",
            "description": "<p>Doctor's Id.</p>"
          }
        ]
      }
    },
    "description": "<p>Get Patient by Doctor's Id. (Used on LadingPage.handleOperationBtncreate(), LadingPage.getData(), CreateConsultations._getPatients())</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Patient's ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Patient's Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>Patient's Date of Birthday</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Patient's Gender</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "designation",
            "description": "<p>Patient's Designation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "doctor",
            "description": "<p>Doctor's ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/patients.js",
    "groupTitle": "Patients"
  }
] });
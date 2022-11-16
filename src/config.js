import dotenv from "dotenv"
dotenv.config()

export default {
  fileSystem: {
    path: "./DB"
  },
  mongodb: {
    cnxStr: process.env.MONGOBD_CONNECTION_STRING,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  firebase: {
    type: "service_account",
    project_id: "coderhouse32065-ed079",
    private_key_id: "4dc367218870d8cd3a576b0d09b3051778d34fc8",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDyY1Aw5d5BB/yB\ni7FsMHfS3Iq2fZaIjYNSm++eOTgYNZ7GUEyHOGKZsyLetEKL691mYrT8USjmAJOk\n0ash+hPbaif14QJ4R/PXqgAoFnJZInREBeT5F0C/DHQEzQQ5Qbbmq+AaBkobQjvs\nulq2OxxNuMiEVZmn4nwtMYkPT4L7gr/ZWargPLzsTP6LVkAS7mC9i41f3MqKRq2o\nYuEdtgbh+Zc+9qJhuiDL2pLguTMs5ryZLQhy4++kwoaCsdb6Tw1n07Umjrs3wYBQ\n2kgmxGSvBBK+cHM9lJ5LgPEeiSbHrpZYinSf6QowBapPEzYN+LLwHG2otyQK24xN\n32DWE/69AgMBAAECggEAMWO/MVeFhCbGcvct/eeaYuMBeNH6XHTJb4nKt6jdH0G9\nypcOIPeCT+NKlaqRbMVw5a3zRv6aoNM5QnperpuwdCMbZWSmBjBTJXzEb2azgiod\nGsdAsujkDonREjFcTPZw+GvJTEQ/0XIbl88ZMMy2pbejVCPFHYpu1x6i2PXQsMK8\nJAtfUwIqkTUuMnOgbXEHVSF4TSbBMpoDKQbXjJn6I+T5cYnE/hdzb32X8XkCOxz4\nVCxeK+yFRqWRLFZUrScy+Qo02xRD2GHorP5z4sGJAlJ3zMuN7Hg9zW+bhL6GV/Dg\noXfzkfWoUKNnZCAKYmBR5fWPKqNtMYzI2j7refSGwQKBgQD6zg2sNJP+RpJYzzsG\nz+mcSmkGFNO7rJLDugKjR5PQ+MNDwANinjQGDa3LWYML6aItZS8wC0w/yBaCqlCz\n/VtuBiNOK5YtDhy+Iyc8QfHZTc7mL+UGGz/e9/eCjrma8zt9JfmTIsf780gSXHph\nduI7IMZQNBP1he+x8Usb7tLhJQKBgQD3aKCMQUYaQUgY4Oqq683jHoB5SXFz5+DQ\nruJIH1W54bblELKikfDkW56zOb7OCrsUrtwZWRYmRg3TRQH+iT4AOa1gF75CiusX\n2jXY/iNowstj26jvTMVZMXagb6RkaCcFD+UYWxj14qVI+Z/MdDkB8hVWFLKsrehl\nBQ1Qz3uvuQKBgQCMa9Oh5+o4QqDrklM1FDFyrQKyQfTuLcgaR8n0Sz4KkU0aYKZE\nj9kGzp/Qq7RAdjWz/uP1nU26pDdePydiLucC6fLYcHTrkuwq1JnCFhXnmbXOkWBE\nE/ulxeXRNkHa7HYRMrLSW3XmraZbiWWHrj0p58bA3veRzsSON0/bOtLc9QKBgEp4\nrPLq5v4aLmiGszx1tEisMsHPcJ4R6yMFsUlCXVyRa6sxxoOW6GrkhTWvqRZ+Nmf4\nZnoezcMBjUHN4NbMWuRYeC6XlwaSqEdKwLCrdt8e23gYc5Zshm7dq7aJRHOQwkYM\nzcnyCeZhrZz0vrwdM9e5FeEOY+YEhxJ5XdO4UKPJAoGAa9CPRDgyG5378VzuZjI8\nHlGSA0uIq4Ia7xRyx4cmX5fAvMfGyhgMrS/wyAyTGzlcXgnPZqriSGB8feJmANz8\nvJ84FQg2hjsNS5eWt2MKcLQhQPkLrfqcv3yp/2ATxzOVZDWZD+YcITPD2DqrPeZ6\n81sHpDrsYrBfh2ABYOgdsPk=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-jp3gv@coderhouse32065-ed079.iam.gserviceaccount.com",
    client_id: "116232087174631879270",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jp3gv%40coderhouse32065-ed079.iam.gserviceaccount.com"
  },
  sqlite3: {
    client: "sqlite3",
    connection: {
      filename: `./DB/ecommerce.sqlite`
    },
    useNullAsDefault: true
  },
  mariaDb: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "coderhouse",
      password: "coderhouse",
      database: "coderhouse"
    }
  }
};

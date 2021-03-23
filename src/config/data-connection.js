module.exports = {
    database: {
        authentication: {
            type: "azure-active-directory-password",
            options: {
                userName: "aviramadmin@aviramc9876gmail.onmicrosoft.com",
                password: "Avi15787@",
            }
        },
        server: "aviramserver1.database.windows.net", // update me
        options: {
            database: "aviramdb", //update me
            encrypt: true
        }
    }
}


# Description
This node script decompresses a Zip file found in an S3 bucket and uploads its contents back to the same Bucket.The script uses AWS SDK to access the S3 bucket and the JSZIP bookstore to decompress the ZIP file.

# Setting
Before using this script, you must make sure you have the following:

- An AWS account with access to the S3 bucket containing the Zip file you want to decompress.
- Node.js and NPM installed in your system.

In addition, you must configure your AWS credentials so that the SDK can access the S3 bucket.This can be done through the configuration of the ```AWS_ACCESS_KEY_ID``` and ```AWS_SECRET_ACCESS_KEY``` environment variables.

# Installation
To install the script units, run the following command in your terminal:

```
npm install
```

# Use
To use the script, simply run the following command in your terminal:

```
npm run start
```

The script will look for a ZIP file in the S3 bucket that you specify and decompress its content.Then, the decompressed content will rise back to the same Bucket.

The script is designed to be easily customizable for your needs.You can change the name of the ZIP file that you want to decompress, the name of the folder in which you want to save the decompressed content and the name of the output file.These values are found in the upper part of the Index.js file.

# Contributions
If you want to contribute to this project, you are welcome to do so.You can open an ISSUE or send a Pull Request in the project's Github repository.

Commit's message must follow the structure of conventional commits:

```bash
# <type>(<scope>): <message>
$ feat(users): add login endpoint

#[optional body: A long Description]
$ Added Authentication module for users

#[optional footer(s)]
$ Reviewed-by: Z
$ Refs: #123
```

The scope is optional and can be related to the application directory or the module that is being modified.
The message must be brief and concise, and must be written in infinitive.

The types of commit are:

- **feat**: new functionality
- **fix**: error correction
- **docs**: changes in documentation
- **style**: changes in code style
- **refactor**: changes in the code that do not correct errors or add functionalities
- **perf**: changes in the code that improve performance
- **test**: changes in the tests
- **build**: changes in the compilation system
- **ci**: changes in the continuous integration system
- **chore**: changes in the construction process or auxiliary tools
- **revert**: revert an commit
/**
 * Check the login details
 *
 * @param username
 * @param password
 */
export default (username: string, password: string): Promise<boolean> =>
  new Promise<boolean>((resolve, reject) => {
    resolve(username === process.env.AUTHNAME && password === process.env.AUTHPASSWORD);
    reject("Invalid Credentials")
  });
    

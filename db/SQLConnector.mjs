import mysql from 'mysql2/promise'

/**
 * SQLConnector is used to execute Queries against a MYSQL Database. It follows the Singleton Design Pattern. Therefore you have to use the getInstance Function
 * to get an Instance of SQLConnector
*/

class SQLConnector {

    //TODO: Env
    constructor() {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            user: 'root',
            host: 'localhost',
            database: 'OrganizerDB',
            password: '12345678'
        })

        this.isExiting = false
    }

    /**
     * Generic function to execute a query. Make shure to use prepared statements to prevent sql injections.
     * @param {*} query for the db formulated as a prepared statement
     * @param  {...any} values to insert into the prepared statement
     * @returns a Promise which resolves the data from the db or rejects and provides the error
     */
    async executeQuery(query, ...values) {
        const [rows, fields] = await this.pool.query(query, values)
        return rows
    }

    /**
     * To close the connection to the db
     */
    #closeConnection() {
        this.pool.end(err => {
            if (err) {
                console.error('Error closing the connection pool:', err);
            } else {
                console.log('Connection pool closed successfully.');
            }
        })
    }

    /**
     * Call this method when the connection should be closed
     */
    handleExit() {
        if (!this.isExiting) {
            this.isExiting = true;
            console.log('Exiting application. Closing SQL connection...');
            this.#closeConnection();
        }
    }
}


// Create a singleton instance
let sqlConnectorInstance = new SQLConnector()

// Handle cleanup before process exit
process.on('beforeExit', () => {
    sqlConnectorInstance.handleExit()
});



// Export the singleton instance
export default function getInstance() {
    if (sqlConnectorInstance.isExiting) {
        sqlConnectorInstance = new SQLConnector()
    }
    return sqlConnectorInstance
}

const request = require('postman-request')

const service_client = () => {
    const resource = 'http://192.168.1.31:8000/a2_api/v1';
    return {
        validate_client: async () => {
            return new Promise((resolve, reject) => {
                request.post(`${resource}/validate-client`, function (error, httpResponse, body) {
                    if (error) {
                        return reject(error)
                    }

                    return resolve(JSON.parse(body))
                })
            })

        },
        execute_query: async (query) => {
            return new Promise((resolve, reject) => {
                request.post(`${resource}/execute-query`, { form: { query } }, function (error, httpResponse, body) {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(JSON.parse(body))
                })
            })
        }
    }
}
const client_query = async (req, resp) => {
    try {
        const { nit, ip, query } = req.body;
        // search in the database of ip to point 
        // send query to client
        const resp_client_validation = await service_client().validate_client()
        const resp_client = await service_client().execute_query(query);

        return resp.status(418).json({ resp_client, resp_client_validation })

    } catch (e) {
        console.log(e);
        resp.status(500).json({ message: "Server internal error" })
    }
}

module.exports = client_query
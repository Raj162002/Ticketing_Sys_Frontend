function ConfigurationForm(){
    return(
        <form>
            <h2>Configuration Form</h2>
            <div>
                <label htmlFor="mticketc">Maximum Ticket Count per Vendor: </label>
                <input type="number" id="mticketc" required />
            </div>
            <div>
                <label htmlFor="eventN">Enter the Event Name: </label>
                <input type="text" id="eventN" required />
            </div>
            <div>
                <label htmlFor="vendorNo">Enter the number of vendors: </label>
                <input type="number" id="vendorNo" required />
            </div>
            <div>
                <label htmlFor="ticketRetrival">Enter the ticket retrival rate per second: </label>
                <input type="number" id="ticketRetrival" required />
            </div>
            <div>
                <label htmlFor="customerRetrival">Enter the customer retrival rate per second: </label>
                <input type="number" id="customerRetrival" required />
            </div>
        </form>
    )

}
export default ConfigurationForm;
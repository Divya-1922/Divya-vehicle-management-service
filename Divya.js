const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());

app.use(express.static("frontend"));

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Divya@93903",
    database: "KMDivya"
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Database");
});


// ==================== CUSTOMERS CRUD ====================

// Get All Customers
app.get("/customers", (req, res) => {
    db.query("SELECT * FROM customers", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Get Customer By ID
app.get("/customers/:id", (req, res) => {
    db.query(
        "SELECT * FROM customers WHERE customer_id=?",
        [req.params.id],
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
});

// Insert Customer
app.post("/customers", (req, res) => {

    const {
        customer_id,
        customer_name,
        customer_ph,
        customer_email,
        customer_addr
    } = req.body;

    db.query(
        "INSERT INTO customers VALUES(?,?,?,?,?)",
        [
            customer_id,
            customer_name,
            customer_ph,
            customer_email,
            customer_addr
        ],
        (err) => {
            if (err) throw err;
            res.send("Customer Added");
        }
    );
});

// Update Customer
app.put("/customers/:id", (req, res) => {

    const {
        customer_name,
        customer_ph,
        customer_email,
        customer_addr
    } = req.body;

    db.query(
        "UPDATE customers SET customer_name=?, customer_ph=?, customer_email=?, customer_addr=? WHERE customer_id=?",
        [
            customer_name,
            customer_ph,
            customer_email,
            customer_addr,
            req.params.id
        ],
        (err) => {
            if (err) throw err;
            res.send("Customer Updated");
        }
    );
});

// Delete Customer
app.delete("/customers/:id", (req, res) => {

    db.query(
        "DELETE FROM customers WHERE customer_id=?",
        [req.params.id],
        (err) => {
            if (err) throw err;
            res.send("Customer Deleted");
        }
    );
});


// ==================== VEHICLES CRUD ====================

// Get All Vehicles
app.get("/vehicles", (req, res) => {

    db.query("SELECT * FROM vehicles", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Insert Vehicle
app.post("/vehicles", (req, res) => {

    const {
        vehicle_id,
        customer_id,
        vehicle_number,
        vehicle_model,
        vehicle_type
    } = req.body;

    db.query(
        "INSERT INTO vehicles VALUES(?,?,?,?,?)",
        [
            vehicle_id,
            customer_id,
            vehicle_number,
            vehicle_model,
            vehicle_type
        ],
        (err) => {
            if (err) throw err;
            res.send("Vehicle Added");
        }
    );
});

// Update Vehicle
app.put("/vehicles/:id", (req, res) => {

    const {
        customer_id,
        vehicle_number,
        vehicle_model,
        vehicle_type
    } = req.body;

    db.query(
        "UPDATE vehicles SET customer_id=?, vehicle_number=?, vehicle_model=?, vehicle_type=? WHERE vehicle_id=?",
        [
            customer_id,
            vehicle_number,
            vehicle_model,
            vehicle_type,
            req.params.id
        ],
        (err) => {
            if (err) throw err;
            res.send("Vehicle Updated");
        }
    );
});

// Delete Vehicle
app.delete("/vehicles/:id", (req, res) => {

    db.query(
        "DELETE FROM vehicles WHERE vehicle_id=?",
        [req.params.id],
        (err) => {
            if (err) throw err;
            res.send("Vehicle Deleted");
        }
    );
});


// ==================== SERVICES CRUD ====================

// Get All Services
app.get("/services", (req, res) => {

    db.query("SELECT * FROM services", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Insert Service
app.post("/services", (req, res) => {

    const {
        service_id,
        vehicle_id,
        service_type,
        service_date,
        description,
        service_charge,
        status
    } = req.body;

    db.query(
        "INSERT INTO services VALUES(?,?,?,?,?,?,?)",
        [
            service_id,
            vehicle_id,
            service_type,
            service_date,
            description,
            service_charge,
            status
        ],
        (err) => {
            if (err) throw err;
            res.send("Service Added");
        }
    );
});

// Update Service
app.put("/services/:id", (req, res) => {

    const {
        service_type,
        service_date,
        description,
        service_charge,
        status
    } = req.body;

    db.query(
        "UPDATE services SET service_type=?, service_date=?, description=?, service_charge=?, status=? WHERE service_id=?",
        [
            service_type,
            service_date,
            description,
            service_charge,
            status,
            req.params.id
        ],
        (err) => {
            if (err) throw err;
            res.send("Service Updated");
        }
    );
});

// Delete Service
app.delete("/services/:id", (req, res) => {

    db.query(
        "DELETE FROM services WHERE service_id=?",
        [req.params.id],
        (err) => {
            if (err) throw err;
            res.send("Service Deleted");
        }
    );
});


// ==================== PAYMENTS CRUD ====================

// Get All Payments
app.get("/payments", (req, res) => {

    db.query("SELECT * FROM payments", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Insert Payment
app.post("/payments", (req, res) => {

    const {
        pay_id,
        service_id,
        amount,
        payment_date,
        payment_method
    } = req.body;

    db.query(
        "INSERT INTO payments VALUES(?,?,?,?,?)",
        [
            pay_id,
            service_id,
            amount,
            payment_date,
            payment_method
        ],
        (err) => {
            if (err) throw err;
            res.send("Payment Added");
        }
    );
});

// Update Payment
app.put("/payments/:id", (req, res) => {

    const {
        service_id,
        amount,
        payment_date,
        payment_method
    } = req.body;

    db.query(
        "UPDATE payments SET service_id=?, amount=?, payment_date=?, payment_method=? WHERE pay_id=?",
        [
            service_id,
            amount,
            payment_date,
            payment_method,
            req.params.id
        ],
        (err) => {
            if (err) throw err;
            res.send("Payment Updated");
        }
    );
});

// Delete Payment
app.delete("/payments/:id", (req, res) => {

    db.query(
        "DELETE FROM payments WHERE pay_id=?",
        [req.params.id],
        (err) => {
            if (err) throw err;
            res.send("Payment Deleted");
        }
    );
});


// Start Server
app.listen(3000, () => {
    console.log("Server Running On http://localhost:3000");
});
import db from "@/lib/db";

// GET: Fetch all customers
export async function GET(req) {
    try {
        const [rows] = await db.execute("SELECT * FROM customers");
        return Response.json(rows, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to fetch customers" }, { status: 500 });
    }
}

// POST: Add a new customer
export async function POST(req) {
    try {
        const { name, email, phone } = await req.json();
        const [result] = await db.execute(
            "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)",
            [name, email, phone]
        );
        return Response.json({ id: result.insertId, name, email, phone }, { status: 201 });
    } catch (error) {
        return Response.json({ error: "Failed to add customer" }, { status: 500 });
    }
}

// PUT: Update an existing customer
export async function PUT(req) {
    try {
        const { id, name, email, phone } = await req.json();
        const [result] = await db.execute(
            "UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?",
            [name, email, phone, id]
        );
        if (result.affectedRows === 0) {
            return Response.json({ error: "Customer not found" }, { status: 404 });
        }
        return Response.json({ id, name, email, phone }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to update customer" }, { status: 500 });
    }
}

// DELETE: Remove a customer
export async function DELETE(req) {
    try {
        const { id } = await req.json();
        const [result] = await db.execute("DELETE FROM customers WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return Response.json({ error: "Customer not found" }, { status: 404 });
        }
        return Response.json({ message: "Customer deleted successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to delete customer" }, { status: 500 });
    }
}

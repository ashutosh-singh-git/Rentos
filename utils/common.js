export function getRoomObject() {
    return {
        roomId: {
            value: "",
            input: "text"
        },
        occupant: {
            value: "",
            editable: false,
            input: "text"
        },
        status: {
            value: "",
            editable: false,
            input: "select",
            options: ["Paid", "To Pay", "On Hold"]
        },
        type: {
            value: "",
            editable: false,
            input: "select",
            options: ["Single Share", "Double Share"]
        },
        rent: {
            value: 0,
            editable: false,
            input: "number",
        },
        electricity: {
            value: 0,
            editable: false,
            input: "number"
        },
        extraCharges: {
            value: 0,
            editable: false,
            input: "number"
        }
    }
}

export function getOccupantObject() {
    return {
        occupantId: {
            value: 1,
            input: "number"
        },
        name: {
            value: "",
            editable: false,
            input: "text"
        },
        phone: {
            value: "",
            editable: false,
            input: "number",
        },
        address: {
            value: "",
            editable: false,
            input: "textarea",
        },
        startDate: {
            value: "",
            editable: false,
            input: "date",
        },
        endDate: {
            value: "",
            editable: false,
            input: "date"
        },
        roomNo: {
            value: "",
            editable: false,
            input: "text"
        },
        status: {
            value: "Living",
            editable: false,
            input: "select",
            options: ["Living", "Left"]
        },
        referenceName: {
            value: "",
            editable: false,
            input: "text"
        },
        referencePhone: {
            value: 0,
            editable: false,
            input: "number"
        },
    }
}

export function getPaymentObject() {
    return {
        paymentId: {
            value: 1,
            input: "number"
        },
        roomId: {
            value: "",
            editable: false,
            input: "text"
        },
        occupantId: {
            value: "",
            editable: false,
            input: "number",
        },
        amount: {
            value: "",
            editable: false,
            input: "number",
        },
        due: {
            value: "",
            editable: false,
            input: "number",
        },
        forMonth: {
            value: "",
            editable: false,
            input: "date",
            options: "month"
        },
        receivedDate: {
            value: "",
            editable: false,
            input: "date"
        }
    }
}
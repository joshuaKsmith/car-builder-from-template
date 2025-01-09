import { getOrders } from "./database.js"
import { completeOrder } from "./database.js"

export const Orders = async () => {
    const orders = await getOrders()

    document.addEventListener("click", (event) => {
        const { name, id } = event.target;
        if (name === "complete") {
            completeOrder(id);
        }
    })

    return `
        ${orders.map(order => {
            return `
                <section class="order">
                    ${order.paintColor.color} car with
                    ${order.wheels.style} wheels,
                    ${order.interior.material} interior,
                    and the ${order.technology.package}
                    for a total cost of
                    ${(order.totalCost).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    })}
                    <input type="button" name="complete" id="${order.id}" value="Complete">
                </section>
            `
        }).join("")}
    `
}


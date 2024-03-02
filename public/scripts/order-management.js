const updateOrderForms = document.querySelectorAll('.order-status-form');

async function updateOrder(event){
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const newStatus = formData.get('status');
    const orderId = formData.get('orderid');
    const csrftoken = formData.get('CSRFToken');
   

    let response;

    try {
        response = await fetch(`/admin/changestatus/${orderId}`,{
            method: 'PATCH',
            body: JSON.stringify({
                newStatus: newStatus,
                CSRFToken: csrftoken,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        alert('first step! Something went wrong - could not update order status.');
    return;
    }

    if (!response.ok) {
        alert('No response!Something went wrong - could not update order status.');
        return;
      }

      const responseData = await response.json();

      form.parentElement.firstElementChild.lastChild.textContent =
      responseData.newStatus;

}

for(const updateOrderForm of updateOrderForms ){
    updateOrderForm.addEventListener('submit', updateOrder )

}
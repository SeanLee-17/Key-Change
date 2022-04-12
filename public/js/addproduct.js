async function newFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('#formGroupExampleInput').value;
  const description = document.querySelector('#formGroupExampleInput2').value;
  let price = document.querySelector('#formGroupExampleInput3').value;
  price = parseInt(price);
  const response = await fetch(`/api/product`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      description,
      price
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);
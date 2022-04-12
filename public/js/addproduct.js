let url = ""
  var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dvs6jlbvz',
    uploadPreset: 'i5wetczb'
  }, (error, result) => {
    if (!error && result && result.event === "success") {
      console.log('Done! Here is the image info: ', result.info);
      url = result.info.secure_url;
    }
  }
  )

  document.getElementById("upload_widget").addEventListener("click", function () {
    myWidget.open();
  }, false);



async function newFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('#formGroupExampleInput').value;
  const description = document.querySelector('#formGroupExampleInput2').value;
  let price = document.querySelector('#formGroupExampleInput3').value;
  price = parseInt(price);
  console.log(url);
  const response = await fetch(`/api/product`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      description,
      price,
      url
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    console.error(response.statusText);
  }
};

document.querySelector('#addProdSubmit').addEventListener('click', newFormHandler);
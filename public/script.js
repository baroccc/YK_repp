function getLum() {
    fetch('/lumi')
      .then(response => response.json())
      .then(data => {
        document.getElementById("data_lumi").innerHTML = data[0].luz;
      });
  }
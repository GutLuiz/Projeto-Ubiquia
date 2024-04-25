document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([-23.55052, -46.633308], 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);
  
    function buscaCEP(cep) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (data.erro) {
            console.error('CEP não encontrado');
          } else {
            mostraEnderecoNoMapa(data);
          }
        })
        .catch(error => console.error('Falha na requisição', error));
    }
  
    function mostraEnderecoNoMapa(data) {
      var enderecoCompleto = `${data.logradouro}, ${data.localidade}, ${data.uf}, Brasil`;
      fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(enderecoCompleto)}&format=json`)
        .then(response => response.json())
        .then(locations => {
          if (locations.length > 0) {
            var location = locations[0];
            map.setView([location.lat, location.lon], 15);
            L.marker([location.lat, location.lon]).addTo(map)
              .bindPopup(enderecoCompleto)
              .openPopup();
          } else {
            console.error('Endereço não encontrado no mapa');
          }
        });
    }
  
    buscaCEP('01001-000'); // Teste com um CEP de exemplo
});




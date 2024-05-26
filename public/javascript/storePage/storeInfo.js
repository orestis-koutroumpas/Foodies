// public/javascript/storePage/main.js

export function addStoreInfo(storeInfo) {
    var storeInfoDiv = document.querySelector('.Store-Location .Store-Info');
    
    // Clear existing content
    storeInfoDiv.innerHTML = '';

    var h2 = document.createElement('h2');
    h2.textContent = 'Store Information';
    storeInfoDiv.appendChild(h2);

    var p1 = document.createElement('p');
    p1.textContent = 'Delivery Hours:';
    storeInfoDiv.appendChild(p1);

    for (var day in storeInfo.deliveryHours) {
        var p = document.createElement('p');
        p.className = 'delivery-hours'; 
        p.textContent = day + ' :  ' + storeInfo.deliveryHours[day];
        p1.appendChild(p);
    }

    var p2 = document.createElement('p');
    p2.textContent = 'Store Address:';
    var a = document.createElement('a'); 
    a.className = 'address';
    a.href = '#'; 
    a.textContent = storeInfo.address;
    a.addEventListener('click', function(event) {
        event.preventDefault(); 
        var url = `https://www.google.com/maps?q=${encodeURIComponent(storeInfo.address)}&z=15&hl=en`;
        window.open(url, '_blank'); 
    }); 
    p2.appendChild(a);
    storeInfoDiv.appendChild(p2);

    var p3 = document.createElement('p');
    p3.textContent = 'Contact Phone:';
    var span3 = document.createElement('span');
    span3.textContent = storeInfo.phone;
    span3.className = 'phone';
    p3.appendChild(span3);
    storeInfoDiv.appendChild(p3);
}

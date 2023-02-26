const matchList = document.getElementById('match-list')

document.getElementById('search').addEventListener('input', async () => {
let text = document.getElementById('search').value;

const res = 

await fetch(/*THIS IS WHERE YOUR FOOD DATA CENTRAL API WILL GO. I HAVE REMOVED THIS AS IT IS PRIVATE INFORMATION (FOOD DATA CENTRAL LIMITS SHARING THESE URLs). 
YOU CAN RETRIEVE YOUR URL URL FROM THIS SITE: https://fdc.nal.usda.gov/api-guide.html.
ONCE YOU HAVE DONE SO, SIMPLY PUT THE 'text' VARIABLE WITHIN THE QUERY STRING, AND YOUR RESULTS WILL FILTER AS YOU TYPE EACH LETTER! */);
const data = [await res.json()];

if(text.length !== 0) {
    matchList.innerHTML = ''
for(let i = 0; i <50; i++){
if(data.totalHits != 0) {
    matchList.style.display = 'grid';
    try{
    const num = '1008'
    
    const food = data[0].foods[i].foodNutrients.filter(function(itm) {
       return num.includes(itm.nutrientId)})
    
    let tests =  data.map(d => `<div>
    <h4>${d.foods[i].description}</h4>
    <span>${d.foods[i].brandOwner || 'no brand available!'}</span><br>
    Serving Size: ${d.foods[i].servingSize || '-'} ${d.foods[i].servingSizeUnit || ''}<br>
    <p>Calorie Count: ${food[0].value} calories</p></div>`);
    
    matchList.innerHTML += tests

    } catch(e) {
        if(data.totalHits) {
    let error = `<div>
    <h4>No food available!</h4>`
    matchList.innerHTML = error
        }
    }

}  
}
} else {
    matchList.innerHTML = 'start typing to find a food!'
}})
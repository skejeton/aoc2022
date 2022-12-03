let x=document.body.innerText.split("\n\n").map(e=>e.split("\n").map(j=>parseInt(j)).reduce((a,b)=>a+b)).sort((a,b)=>b-a);[x[0],x[0]+x[1]+x[2]]


    AOS.init({ duration: 1000, once: true });

    document.querySelectorAll(".contact-card,.info-card")
        .forEach(card=>{

            card.classList.add("glow-card")

            card.addEventListener("mousemove",(e)=>{

                const rect = card.getBoundingClientRect()

                card.style.setProperty("--x",(e.clientX-rect.left)+"px")
                card.style.setProperty("--y",(e.clientY-rect.top)+"px")

            })

        })

    document.querySelectorAll(".contact-card,.info-card")
        .forEach(card=>{

            card.classList.add("glow-card")

            card.addEventListener("mousemove",(e)=>{

                const rect = card.getBoundingClientRect()

                card.style.setProperty("--x",(e.clientX-rect.left)+"px")
                card.style.setProperty("--y",(e.clientY-rect.top)+"px")

            })

        })

    const text = "Développeur BUT Informatique spécialisé Santé & Technologie";
    const typing = document.getElementById("typing-text");

    let i=0;

    function type(){

        if(i<text.length){

            typing.innerHTML += text.charAt(i);
            i++;

            setTimeout(type,40);

        }

    }

    type();

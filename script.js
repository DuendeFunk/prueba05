document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LIVE CLOCK UPDATE ---
    const clockElements = document.querySelectorAll('.live-clock');
    
    function updateClocks() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        // Adds milliseconds for that frantic CCTV feel
        const ms = String(now.getMilliseconds()).padStart(3, '0').substring(0, 2);
        
        clockElements.forEach(el => {
            el.innerText = `${timeString}:${ms}`;
        });
        
        requestAnimationFrame(updateClocks);
    }
    updateClocks();

    // --- 2. FAST TYPEWRITER EFFECT FOR TERMINAL ---
    const terminalLines = document.querySelectorAll('.terminal-feed p:not(.blink-cursor)');
    
    // Quick and dirty sequential reveal
    terminalLines.forEach(line => line.style.display = 'none');
    
    let lineIdx = 0;
    function revealTerminal() {
        if(lineIdx < terminalLines.length) {
            terminalLines[lineIdx].style.display = 'block';
            lineIdx++;
            setTimeout(revealTerminal, 300);
        }
    }
    setTimeout(revealTerminal, 1000);


    // --- 3. ALIAS COPY LOGIC ---
    const tipJarBox = document.getElementById("tip-btn");
    const aliasTextNode = document.getElementById("alias-text");
    const btnNode = tipJarBox.querySelector('.sys-btn');
    const copyAlias = "repartobuenaonda";

    if (tipJarBox && aliasTextNode) {
        tipJarBox.addEventListener("click", () => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(copyAlias)
                    .then(() => showFeedback())
                    .catch(() => fallbackCopy(copyAlias));
            } else {
                fallbackCopy(copyAlias);
            }
        });
    }

    function fallbackCopy(text) {
        const tempInput = document.createElement("input");
        tempInput.value = text;
        tempInput.style.position = "fixed";
        tempInput.style.top = "0";
        tempInput.style.left = "0";

        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();

        try {
            document.execCommand("copy");
            showFeedback();
        } catch (err) {
            console.error("Fallback fail.", err);
        }
        document.body.removeChild(tempInput);
    }

    function showFeedback() {
        const originalText = aliasTextNode.innerText;
        const originalBtnText = btnNode.innerText;
        
        aliasTextNode.innerText = "[ DATA COPIED ]";
        btnNode.innerText = "SUCCESS";
        tipJarBox.style.borderColor = "#fff";
        
        // Glitch effect color
        aliasTextNode.style.color = "#fff";
        
        setTimeout(() => {
            aliasTextNode.innerText = originalText;
            btnNode.innerText = originalBtnText;
            tipJarBox.style.borderColor = "";
            aliasTextNode.style.color = "";
        }, 1500);
    }

});

function redirectUrl(url){
    setTimeout(()=>{
        window.location.href = url;
    }, 3000);
}

function normalizePath(path){
    return path.replace(/^#/, "").replace(/^\/+|\/+$/g, "").toLowerCase();
}

async function findRedirect(){
    const status = document.getElementById("status");

    try {
        const redirectsUrl = new URL("./redirects.json", document.currentScript.src);
        const response = await fetch(redirectsUrl);

        if (!response.ok) {
            throw new Error(`Falha ao carregar redirects.json (HTTP ${response.status}).`);
        }

        const redirects = await response.json();
        const hashPath = normalizePath(window.location.hash);
        const pathname = normalizePath(window.location.pathname.split("/").pop());
        const targetUrl = redirects[hashPath] || redirects[pathname];

        if (!targetUrl) {
            status.textContent = "Página não encontrada.";
            return;
        }

        status.textContent = "Redirecionando em 3 segundos...";
        redirectUrl(targetUrl);
    } catch (error) {
        console.error("Não foi possível carregar os redirecionamentos:", error);
        status.textContent = "Não foi possível carregar os redirecionamentos.";
    }
}

findRedirect();

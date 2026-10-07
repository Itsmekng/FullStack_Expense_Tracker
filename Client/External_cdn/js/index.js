function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src = src;

        script.onload = () => {
            resolve();
        };

        script.onerror = () => {
            console.error("Failed:", src);
            reject(new Error(`Failed to load ${src}`));
        };

        document.head.appendChild(script);
    });
}


async function loadExternalLibraries() {

    await loadScript("/Client/constant/constant.js");

    await loadScript("/Client/External_cdn/js/axios_v1.20.0.js");

    await loadScript("/Client/External_cdn/js/bootstrap_v5.3.8.js");

    await loadScript("/Client/External_cdn/js/jquery_dataTable_3.1.2.js");

    await loadScript(
        "/Client/External_cdn/js/jquery_dataTable_buttons_4.1.2.js"
    );

    await loadScript(
        "/Client/External_cdn/js/jquery_dataTable_buttons2_4.1.2.js"
    );

    await loadScript(
        "/Client/External_cdn/js/jquery_jszip_3.10.1.js"
    );

    await loadScript(
        "/Client/External_cdn/js/jquery_pdfmake_0.3.11.js"
    );

    await loadScript(
        "/Client/External_cdn/js/jquery_vfs_fonts_0.3.11.js"
    );

    await loadScript(
        "https://sdk.cashfree.com/js/v3/cashfree.js"
    );
}


// IMPORTANT:
// Make the Promise available to your HTML page.
window.externalCdnReady = loadExternalLibraries();
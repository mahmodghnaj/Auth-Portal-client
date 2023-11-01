!function () {
    try {
        var d = document.documentElement
        var e = localStorage.getItem('theme');
        if (e === 'system' || !e) {
            var t = '(prefers-color-scheme: dark)',
                m = window.matchMedia(t);
            if (m.media !== t || m.matches) { d.setAttribute("data-theme", 'dark'); }
            else { d.setAttribute("data-theme", 'light'); }
        }
        else if (e) { d.setAttribute("data-theme", e || ''); }
    } catch (e) { }
}()






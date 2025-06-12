import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-5 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

        {/* Brand & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-extrabold text-yellow-400 mb-1 tracking-wide">InfinityOS</h2>
          <p className="text-sm">© 2025 InfinityOS. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium">

          <a
            href="/services"
            className="hover:text-yellow-400 border-b-2 border-transparent hover:border-yellow-400 transition-all"
          >
            Terms & Services
          </a>
          <a
            href="/contact"
            className="hover:text-yellow-400 border-b-2 border-transparent hover:border-yellow-400 transition-all"
          >
            Contact Us
          </a>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-5 justify-center md:justify-end">
          <a
            href="https://www.facebook.com/iinfinityai?rdid=7M74vo9Dl0Be7DZl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14vewT6UU1%2F#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-yellow-400 transition-colors"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.675V1.325C24 .6 23.4 0 22.675 0z" />
            </svg>
          </a>

          <a
            href="https://x.com/AiIinfinit21885?t=XU7sLjOqaXFQVitQRTICtQ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-yellow-400 transition-colors"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.609 1.794-1.574 2.163-2.724-.949.562-2.003.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.723 0-4.928 2.206-4.928 4.928 0 .39.045.765.127 1.124-4.09-.205-7.72-2.165-10.148-5.144-.423.726-.666 1.562-.666 2.457 0 1.695.863 3.193 2.175 4.07-.803-.025-1.56-.247-2.223-.616v.061c0 2.367 1.684 4.34 3.918 4.78-.41.111-.84.171-1.284.171-.314 0-.615-.03-.91-.086.617 1.927 2.41 3.33 4.53 3.37-1.66 1.3-3.757 2.077-6.037 2.077-.392 0-.779-.023-1.158-.067 2.147 1.376 4.7 2.18 7.446 2.18 8.928 0 13.815-7.4 13.815-13.815 0-.21-.005-.423-.014-.633.95-.686 1.775-1.54 2.425-2.513z" />
            </svg>
          </a>
      
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;

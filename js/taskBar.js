const fileExplorer = document.querySelector("#file-explorer");
const explorer = document.querySelector(".explorer");
const minimizeBtn = document.querySelector("#minimize-btn");
const windowsIcon = document.querySelector('.windows-icon');
const windowsProp = document.querySelector('.windows-prop');

class TaskbarController {
  constructor() {
    this.fileExplorer = document.querySelector("#file-explorer");
    this.explorer = document.querySelector(".explorer");
    this.windowsIcon = document.querySelector('.windows-icon');
    this.windowsProp = document.querySelector('.windows-prop');

    // Modal elements
    this.modal = document.querySelector("#demo-modal");
    this.modalIcon = this.modal?.querySelector(".demo-modal__icon");
    this.modalTitle = this.modal?.querySelector(".demo-modal__title");
    this.modalBody = this.modal?.querySelector(".demo-modal__body");
    this.modalClose = this.modal?.querySelector(".demo-modal__close");

    // Power shutdown button
    this.powerBtn = document.querySelector(".start-menu__power-btn");

    this.init();
  }

  init() {
    this.setupClock();
    this.setupStartMenuToggle();
    this.setupAppClickListeners();
    this.setupModalClose();
    this.exposeGlobalHelpers();

    if (this.explorer && this.fileExplorer) {
      this.explorer.addEventListener("click", () => {
        this.fileExplorer.style.display = "block";
      });
    }
  }

  setupClock() {
    const updateTime = () => {
      const dateTimeSpan = document.querySelector(".dateTime");
      if (dateTimeSpan) {
        dateTimeSpan.textContent = new Date().toLocaleTimeString();
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  setupStartMenuToggle() {
    if (!this.windowsIcon || !this.windowsProp) return;

    this.windowsIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = this.windowsProp.style.display === 'block';
      this.windowsProp.style.display = isVisible ? 'none' : 'block';
    });

    // Prevent clicks inside the start menu from closing it
    this.windowsProp.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Click outside to close start menu
    document.addEventListener('click', () => {
      if (this.windowsProp.style.display === 'block') {
        this.windowsProp.style.display = 'none';
      }
    });
  }

  setupAppClickListeners() {
    // Listeners for App Items
    const appItems = document.querySelectorAll(".start-menu__app-item");
    appItems.forEach(item => {
      item.addEventListener("click", () => {
        const appName = item.dataset.app;
        this.showDemoFile(appName, appName);
        this.windowsProp.style.display = "none";
      });
    });

    // Listeners for File Items
    const fileItems = document.querySelectorAll(".start-menu__file-item");
    fileItems.forEach(item => {
      item.addEventListener("click", () => {
        const fileName = item.dataset.fileName;
        const fileType = item.dataset.fileType;
        this.showDemoFile(fileName, fileType);
        this.windowsProp.style.display = "none";
      });
    });

    // Shut down button listener
    if (this.powerBtn) {
      this.powerBtn.addEventListener("click", () => {
        this.triggerShutdown();
      });
    }
  }

  setupModalClose() {
    if (!this.modalClose || !this.modal) return;

    this.modalClose.addEventListener("click", () => {
      this.modal.style.display = "none";
    });

    // Close on backdrop click
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.modal.style.display = "none";
      }
    });
  }

  exposeGlobalHelpers() {
    window.showDemoFile = (name, type) => {
      this.showDemoFile(name, type);
    };
  }

  showDemoFile(name, type) {
    if (!this.modal || !this.modalIcon || !this.modalTitle || !this.modalBody) return;

    const data = this.getMockContent(name, type);
    this.modalIcon.textContent = data.icon;
    this.modalTitle.textContent = data.title;
    this.modalBody.innerHTML = data.body;
    this.modal.style.display = "flex";
  }

  triggerShutdown() {
    this.windowsProp.style.display = "none";
    const shutdownDiv = document.createElement("div");
    shutdownDiv.style.position = "fixed";
    shutdownDiv.style.top = "0";
    shutdownDiv.style.left = "0";
    shutdownDiv.style.width = "100vw";
    shutdownDiv.style.height = "100vh";
    shutdownDiv.style.background = "black";
    shutdownDiv.style.color = "white";
    shutdownDiv.style.zIndex = "30000";
    shutdownDiv.style.display = "flex";
    shutdownDiv.style.flexDirection = "column";
    shutdownDiv.style.alignItems = "center";
    shutdownDiv.style.justifyContent = "center";
    shutdownDiv.style.fontFamily = "sans-serif";
    shutdownDiv.style.gap = "20px";

    shutdownDiv.innerHTML = `
      <div style="border: 4px solid rgba(255,255,255,0.1); border-top: 4px solid #0078d4; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div>
      <span style="font-size: 16px;">Shutting down...</span>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;

    document.body.appendChild(shutdownDiv);

    setTimeout(() => {
      shutdownDiv.remove();
    }, 2500);
  }

  getMockContent(name, type) {
    name = name.toLowerCase();
    
    if (name.includes("edge") || type === "edge") {
      return {
        icon: "🌐",
        title: "Microsoft Edge",
        body: `
          <div class="mock-browser" style="display: flex; flex-direction: column; height: 100%; font-family: sans-serif;">
            <div style="background: #202124; padding: 6px 12px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #3c4043;">
              <div style="display: flex; gap: 8px; color: #9aa0a6;">
                <span class="material-icons" style="font-size: 16px; cursor: pointer;">arrow_back</span>
                <span class="material-icons" style="font-size: 16px; cursor: pointer;">arrow_forward</span>
                <span class="material-icons" style="font-size: 16px; cursor: pointer;">refresh</span>
              </div>
              <div style="flex-grow: 1; background: #2f3033; border-radius: 12px; padding: 4px 10px; font-size: 12px; color: #e8eaed; border: none; text-align: left; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                https://www.google.com/search?q=Hassan+Iftikhar
              </div>
            </div>
            <div style="flex-grow: 1; background: #202124; padding: 30px 20px; overflow-y: auto; text-align: center; color: white;">
              <h2 style="color: #4285f4; font-size: 32px; font-weight: bold; margin-bottom: 20px;">Google</h2>
              <div style="max-width: 480px; margin: 0 auto 30px;">
                <div style="width: 100%; padding: 10px 15px; border: 1px solid #5f6368; border-radius: 24px; background: #202124; color: white; display: flex; align-items: center; gap: 10px;">
                  <span class="material-icons" style="color: #9aa0a6; font-size: 18px;">search</span>
                  <span style="font-size: 14px;">Hassan Iftikhar</span>
                </div>
              </div>
              <div style="max-width: 480px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px;">
                <div style="text-align: left; background: #303134; padding: 15px; border-radius: 8px; border: 1px solid #3c4043;">
                  <h3 style="color: #8ab4f8; margin: 0 0 6px 0; font-size: 15px; font-weight: normal; cursor: pointer;">Hassan Iftikhar - Portfolio</h3>
                  <p style="color: #bdc1c6; font-size: 12px; line-height: 1.4; margin: 0;">Senior Full-Stack Engineer specialized in highly interactive front-ends, custom SASS compilation pipelines, and elegant desktop-on-web experiences.</p>
                </div>
                <div style="text-align: left; background: #303134; padding: 15px; border-radius: 8px; border: 1px solid #3c4043;">
                  <h3 style="color: #8ab4f8; margin: 0 0 6px 0; font-size: 15px; font-weight: normal; cursor: pointer;">File Explorer Project Overview</h3>
                  <p style="color: #bdc1c6; font-size: 12px; line-height: 1.4; margin: 0;">Explore folders recursively, create temporary mock text documents, view system details, and utilize customizable layout styles inside the workspace.</p>
                </div>
              </div>
            </div>
          </div>
        `
      };
    }
    
    if (name.includes("word") || name.includes(".docx") || type === "word") {
      return {
        icon: "📝",
        title: name || "Project Proposal.docx",
        body: `
          <div style="background: white; color: #333; padding: 30px; font-family: 'Calibri', 'Arial', sans-serif; min-height: 100%; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); text-align: left;">
            <h1 style="color: #2b579a; border-bottom: 2px solid #2b579a; padding-bottom: 10px; margin: 0 0 20px 0; font-size: 24px;">Project Proposal</h1>
            <p style="font-size: 15px; line-height: 1.6; margin-bottom: 15px;"><strong>Prepared By:</strong> Hassan Iftikhar</p>
            <p style="font-size: 15px; line-height: 1.6; margin-bottom: 15px;"><strong>Status:</strong> Active / Draft</p>
            
            <h3 style="color: #2b579a; margin: 25px 0 10px 0; font-size: 16px;">1. Executive Summary</h3>
            <p style="font-size: 14px; line-height: 1.6; margin-bottom: 15px;">This document outlines the proposal for building a next-generation desktop UI framework built in vanilla JavaScript and CSS, replicating the best aspects of desktop UX within browser sandboxes.</p>
            
            <h3 style="color: #2b579a; margin: 25px 0 10px 0; font-size: 16px;">2. Key Deliverables</h3>
            <ul style="font-size: 14px; line-height: 1.6; margin-left: 20px; margin-bottom: 15px; padding-left: 0;">
              <li>Dynamic Folder Hierarchy Navigation</li>
              <li>Sleek dark mode theme and glassmorphism styling</li>
              <li>Fully functional CRUD operations via persistent store</li>
            </ul>
          </div>
        `
      };
    }
    
    if (name.includes("excel") || name.includes(".xlsx") || type === "excel") {
      return {
        icon: "📊",
        title: name || "Financials.xlsx",
        body: `
          <div style="background: #f3f2f1; color: #333; height: 100%; padding: 10px; font-family: 'Segoe UI', sans-serif; text-align: left;">
            <div style="background: #107c41; color: white; padding: 8px 15px; font-weight: bold; border-radius: 4px 4px 0 0; display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span>Excel - Budget Plan</span>
              <span style="font-size: 12px; opacity: 0.8;">Autosaved</span>
            </div>
            <table style="width: 100%; border-collapse: collapse; background: white; font-size: 13px;">
              <thead>
                <tr style="background: #e1dfdd; border-bottom: 1px solid #d2d0ce;">
                  <th style="border: 1px solid #d2d0ce; padding: 6px;">#</th>
                  <th style="border: 1px solid #d2d0ce; padding: 6px; text-align: left;">Category</th>
                  <th style="border: 1px solid #d2d0ce; padding: 6px; text-align: right;">Q1 Budget</th>
                  <th style="border: 1px solid #d2d0ce; padding: 6px; text-align: right;">Q2 Budget</th>
                  <th style="border: 1px solid #d2d0ce; padding: 6px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: center; font-weight: bold;">1</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px;">Development</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: right;">$12,000</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: right;">$14,500</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: right; font-weight: bold;">$26,500</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: center; font-weight: bold;">2</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px;">Marketing</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: right;">$4,500</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: right;">$5,000</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: right; font-weight: bold;">$9,500</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: center; font-weight: bold;">3</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px;">Design & UX</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: right;">$8,000</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: right;">$8,000</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: right; font-weight: bold;">$16,000</td>
                </tr>
                <tr style="background: #f3f2f1; font-weight: bold; border-top: 2px solid #107c41;">
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: center;">Total</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px;">All Ops</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: right;">$24,500</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: right;">$27,500</td>
                  <td style="border: 1px solid #d2d0ce; padding: 6px; text-align: right; color: #107c41;">$52,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      };
    }
    
    if (name.includes("powerpoint") || name.includes(".pptx") || type === "powerpoint") {
      return {
        icon: "📉",
        title: "Presentation.pptx",
        body: `
          <div style="background: #252525; padding: 20px; border-radius: 4px; height: 100%; display: flex; gap: 15px; font-family: sans-serif; text-align: left;">
            <div style="width: 120px; display: flex; flex-direction: column; gap: 10px;">
              <div style="background: #b7472a; height: 60px; border: 1.5px solid white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; color: white;">Slide 1</div>
              <div style="background: #444; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #aaa;">Slide 2</div>
            </div>
            <div style="flex-grow: 1; background: linear-gradient(135deg, #b7472a, #621c0b); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: white; padding: 30px;">
              <h1 style="font-size: 24px; margin-bottom: 10px;">Windows 11 UI</h1>
              <p style="font-size: 14px; opacity: 0.8;">A fully agentic demo experience</p>
            </div>
          </div>
        `
      };
    }
    
    if (name.includes("settings") || type === "settings") {
      return {
        icon: "⚙️",
        title: "Settings",
        body: `
          <div style="display: flex; height: 100%; font-family: sans-serif; text-align: left;">
            <div style="width: 150px; background: #252526; padding: 10px; display: flex; flex-direction: column; gap: 8px; border-right: 1px solid rgba(255,255,255,0.1);">
              <div style="padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; font-size: 13px; font-weight: bold;">System</div>
              <div style="padding: 8px; opacity: 0.7; font-size: 13px;">Personalization</div>
              <div style="padding: 8px; opacity: 0.7; font-size: 13px;">Apps</div>
              <div style="padding: 8px; opacity: 0.7; font-size: 13px;">Windows Update</div>
            </div>
            <div style="flex-grow: 1; padding: 20px; display: flex; flex-direction: column; gap: 15px;">
              <h2 style="margin: 0; font-size: 20px;">System Settings</h2>
              <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: bold; font-size: 14px;">Dark Theme</div>
                  <div style="font-size: 12px; opacity: 0.6;">Toggle system-wide dark mode settings</div>
                </div>
                <input type="checkbox" checked style="width: 40px; height: 20px; cursor: pointer;" />
              </div>
              <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: bold; font-size: 14px;">Developer Mode</div>
                  <div style="font-size: 12px; opacity: 0.6;">Allow installation of unverified scripts</div>
                </div>
                <input type="checkbox" style="width: 40px; height: 20px; cursor: pointer;" />
              </div>
            </div>
          </div>
        `
      };
    }
    
    if (name.includes("store") || type === "store") {
      return {
        icon: "🛍️",
        title: "Microsoft Store",
        body: `
          <div style="font-family: sans-serif; text-align: left;">
            <h2 style="margin: 0 0 20px 0; font-size: 20px;">Top Free Apps</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
              <div style="background: #252526; border: 1px solid rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px;">
                <div style="font-size: 32px;">💻</div>
                <div style="font-weight: bold; font-size: 14px;">VS Code</div>
                <button onclick="this.textContent='Installed'; this.style.background='#444';" style="width: 100%; padding: 6px; background: #0078d4; border: none; color: white; border-radius: 4px; cursor: pointer; font-size: 12px;">Install</button>
              </div>
              <div style="background: #252526; border: 1px solid rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px;">
                <div style="font-size: 32px;">🎵</div>
                <div style="font-weight: bold; font-size: 14px;">Spotify</div>
                <button onclick="this.textContent='Installed'; this.style.background='#444';" style="width: 100%; padding: 6px; background: #0078d4; border: none; color: white; border-radius: 4px; cursor: pointer; font-size: 12px;">Install</button>
              </div>
              <div style="background: #252526; border: 1px solid rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px;">
                <div style="font-size: 32px;">💬</div>
                <div style="font-weight: bold; font-size: 14px;">Discord</div>
                <button onclick="this.textContent='Installed'; this.style.background='#444';" style="width: 100%; padding: 6px; background: #0078d4; border: none; color: white; border-radius: 4px; cursor: pointer; font-size: 12px;">Install</button>
              </div>
            </div>
          </div>
        `
      };
    }
    
    if (name.includes("photos") || name.includes(".jpg") || name.includes(".png") || type === "photos" || type === "image") {
      return {
        icon: "🖼️",
        title: name || "Photos",
        body: `
          <div style="font-family: sans-serif; text-align: center;">
            <div style="margin-bottom: 15px; background: linear-gradient(135deg, #e040fb, #00e5ff); height: 220px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 40px; color: white; font-weight: bold; box-shadow: inset 0 0 20px rgba(0,0,0,0.2);">
              🌅 Sunset.jpg
            </div>
            <p style="font-size: 13px; color: rgba(255,255,255,0.7); margin: 0;">Dimensions: 1920 x 1080 | Camera: Canon EOS 5D Mark IV | ISO 100</p>
          </div>
        `
      };
    }

    if (name.includes(".pdf") || type === "pdf") {
      return {
        icon: "📄",
        title: name,
        body: `
          <div style="background: #525659; color: white; padding: 20px; height: 100%; display: flex; flex-direction: column; gap: 15px; font-family: sans-serif; text-align: left;">
            <div style="background: #323639; padding: 10px; display: flex; justify-content: space-between; border-radius: 4px; font-size: 12px;">
              <span>PDF Viewer - ${name}</span>
              <span>1 / 1 Pages</span>
            </div>
            <div style="flex-grow: 1; background: white; color: #333; padding: 40px; font-family: serif; box-shadow: 0 4px 12px rgba(0,0,0,0.3); overflow-y: auto;">
              <h1 style="text-align: center; border-bottom: 1px dashed #777; padding-bottom: 15px; margin: 0 0 25px 0; font-size: 24px;">CURRICULUM VITAE</h1>
              <h2 style="font-size: 18px; margin: 15px 0 5px 0;">HASSAN IFTIKHAR</h2>
              <p style="margin: 0 0 15px 0; font-size: 13px;">Email: hassan.iftikhar@example.com | Phone: +1-555-0199</p>
              <hr/>
              <h3 style="font-size: 14px; font-weight: bold; margin: 15px 0 5px 0;">Professional Experience</h3>
              <p style="margin: 0; font-size: 13px; line-height: 1.5;">Senior Full-Stack Architect with over 7 years of engineering stellar web applications and container-virtualized systems.</p>
            </div>
          </div>
        `
      };
    }
    
    // Default Notepad text file
    return {
      icon: "📓",
      title: name || "Notepad",
      body: `
        <div style="display: flex; flex-direction: column; height: 100%; background: #1e1e1e; font-family: 'Consolas', 'Courier New', monospace; text-align: left; border: 1px solid #3d3d3d; border-radius: 4px;">
          <div style="background: #252526; padding: 6px 12px; font-size: 12px; color: #aaa; border-bottom: 1px solid #3d3d3d; display: flex; gap: 15px;">
            <span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span>
          </div>
          <textarea style="flex-grow: 1; background: #1e1e1e; color: #d4d4d4; border: none; padding: 12px; resize: none; outline: none; font-size: 14px; line-height: 1.5; font-family: inherit;">This is a demonstration file created dynamically in our browser file explorer workspace. You can edit this text right now!

Enjoy the premium desktop-grade experience.

Best regards,
Hassan Iftikhar</textarea>
          <div style="background: #252526; padding: 4px 12px; font-size: 11px; color: #888; border-top: 1px solid #3d3d3d; display: flex; justify-content: space-between;">
            <span>Ln 1, Col 1</span>
            <span>100%</span>
            <span>Windows (CRLF)</span>
            <span>UTF-8</span>
          </div>
        </div>
      `
    };
  }
}

new TaskbarController();
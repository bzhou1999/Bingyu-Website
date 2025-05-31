// Global variables
let cursorDot;

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initHero();
    initGallery();
    initModal();
    initAnimations();
    initCursor();
    initAboutSection();
    initContactForm();
    initScrollbarVisibility(); // Add this line
});

// Header functionality with improved scroll detection
function initHeader() {
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const logo = document.querySelector('.logo');
    const heroSection = document.querySelector('.hero');
    
    // Scroll effect for header based on hero section
    window.addEventListener('scroll', function() {
        // Get hero section bottom position
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        
        // If we're still in the hero section (hero bottom is still visible)
        if (heroBottom > 0) {
            header.classList.remove('scrolled');
        } else {
            header.classList.add('scrolled');
        }
    });
    
    // Logo click behavior
    logo.addEventListener('click', function(e) {
        // If not at top, scroll to top smoothly
        if (window.scrollY > 50) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        // If already at top, do nothing (default behavior)
    });
    
    // Close mobile nav when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Highlight active navigation based on scroll position
    updateActiveNavOnScroll();
}

// Highlight active nav item based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY;
        
        // Find current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav item
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Hero section initialization
function initHero() {
    const hero = document.querySelector('.hero');
    
    // Activate hero section after a short delay
    setTimeout(() => {
        hero.classList.add('active');
    }, 300);
    
    // Add subtle parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        
        // Only apply effect if scroll position is within hero section
        if (scrollPosition < window.innerHeight) {
            heroImage.style.transform = `scale(${1 + scrollPosition * 0.0002}) translateY(${scrollPosition * 0.1}px)`;
        }
    });
}

// Gallery functionality
function initGallery() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Filter gallery items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Apply filter with animation
            galleryItems.forEach(item => {
                // Remove visible class from all items first to reset animations
                item.classList.remove('visible');
                
                // Show or hide items based on filter
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    setTimeout(() => {
                        item.style.display = 'block';
                        // Add small delay before adding visible class
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 50);
                    }, 100);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Modal functionality
function initModal() {
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');
    const modalMainImage = document.querySelector('.modal-header img');
    const modalTitle = document.querySelector('.modal-title');
    const modalSubtitle = document.querySelector('.modal-subtitle');
    const modalDescription = document.querySelector('.modal-description');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const modalTabContents = document.querySelectorAll('.modal-tab-content');
    
    let galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    
    // Data structure for artwork information
    const artworkData = [
        // Solarpunk Dreamscape
                {
            title: "Solarpunk Dreamscape",
            subtitle: "Editorial, 2025",
            mainImage: "images/Solarpunk_Dreamscape/Solarpunk_Dreamscape.png",
            imageStyle: "50% 40%",
            description: "<p>To me, solarpunk represents a possibility—a tangible manifestation of our imagination for the future. In <strong>Solarpunk Dreamscape</strong>, I sought to capture a fleeting moment—a moment when consciousness and technology intertwine, illuminating the vast universe. I hope this vision is not merely a product of technology but also an extension of human wisdom and emotion.<p></p>",
            details: {
                dimensions: "1280 X 1960 px",
                materials: "Digital",
                created: "March 2025",
                collection: "Overall Winner, 2025 International Solarpunk Poster"
            },
            gallery: [
                [
                    { src: "images/Solarpunk_Dreamscape/Poster_2.png", type: "hero" }
                ],
                // [
                //     { src: "images/Solarpunk_Dreamscape/Planet.png", type: "feature" },
                // ],
                [
                    { src: "images/Solarpunk_Dreamscape/Poster_1.png", type: "hero" },
                    // { src: "images/Solarpunk_Dreamscape/Detail_1.png", type: "landscape" }
                ],
                [
                    {
                        src: "images/Solarpunk_Dreamscape/Solar_Punk_animation.gif",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },
                    {
                        src: "images/Solarpunk_Dreamscape/Solar_Punk_animation.gif",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },

                ],
                [
                    { 
                        type: "video", 
                        videoType: "local", 
                        videoSrc: "images/Solarpunk_Dreamscape/Video.mp4",
                        vertical: false, 
                        poster:"images/Solarpunk_Dreamscape/Video_Cover.png",
                        span: 12,
                    },
                ]
                
            ],
            featuredGalleryLayout: false

        },
        // All About Diffusion
        {
            title: "All About Diffusion",
            subtitle: "Digital, 2025",
            mainImage: "images/All_About_Diffusion/All_About_Diffusion.png",
            imageStyle: "50% 0%",
            description: "<p>Winner of 2025 Sci-Art Competition.</p><p>From tea swirling in water and scent molecules rising, to digestion and the patterns on a leopard’s coat, <strong>All About Diffusion</strong> captures diverse expressions of movement and transformation. Atop the leopard, a mathematician calculates, symbolizing the bridge between abstract theory and lived phenomena. This work blends art, science, and imagination to reveal the unseen forces shaping our world.</p>",
            details: {
                dimensions: "297 × 210 mm",
                materials: "Digital",
                created: "May 2025",
                collection: "Sci-fi"
            },
            // Simple examples
            gallery: [
                        { src: "/api/placeholder/1200/600", type: "hero"}, // Full-width header
                        { src: "/api/placeholder/800/800", type: "feature" }, // Larger featured image
                        { src: "/api/placeholder/800/800", type: "feature" }, // Larger featured image
                        { src: "/api/placeholder/800/400", type: "landscape" }, // Standard landscape
                        // { src: "/api/placeholder/400/800", type: "portrait" }, // Standard portrait
                        { src: "/api/placeholder/1200/400", type: "panorama" }, // Extra wide panorama
                        // { src: "/api/placeholder/400/1200", type: "tall" }, // Extra tall image
                        // { src: "/api/placeholder/900/600", type: "large" }, // 2x2 grid space
                        // { src: "/api/placeholder/1200/600", type: "xlarge" }, // 3x2 grid space
                        { src: "/api/placeholder/600/600", type: "small-square"}, // With text overlay
                        { src: "/api/placeholder/600/600", type: "small-square"}, // With text overlay

            ],
            featuredGalleryLayout: false
        },

        // Wave To Save
        {
            title: "Wave To Save",
            subtitle: "Selfscape, 2023",
            mainImage: "images/Wave_To_Save/WaveToSave.png",
            imageStyle: "50% 5%",
            description: "<p>A whale leaps from the ocean’s crest, evoking nature’s untamed beauty—below, it is overtaken by oil spilling from a ruptured tube. <strong>Wave To Save</strong> contrasts resilience and ruin, reflecting on the uneasy coexistence of human industry and the natural world.</p>",
            details: {
                dimensions: "297 × 420 cm",
                materials: "Digital",
                created: "June 2023",
                collection: "3rd Prize, 2024 reEarth International Art Prize; Merit Award, 2023 Art on Climate International Illustration Competition"
            },
            gallery:[ 

                [
                    {
                        src: "images/Wave_To_Save/WaveToSave_Outline.png",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },
                    {
                        src: "images/Wave_To_Save/WaveToSave.png",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },

                ],

                
            
                [
                    {
                        src: "images/Wave_To_Save/Reearth1.png",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },
                    {
                        src: "images/Wave_To_Save/Reearth5.png",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },
                    {
                        src: "images/Wave_To_Save/Reearth4.png",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },
                    {
                        src: "images/Wave_To_Save/Reearth2.png",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },

                ],

                [
                    {
                        src: "images/Wave_To_Save/WaveToSave_animation.gif",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },
                    {
                        src: "images/Wave_To_Save/WaveToSave_animation.gif",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },

                ],


            ]
        },

        // Butchering 1
        {
            title: "Butchering",
            subtitle: "Editorial, 2024",
            mainImage: "images/Butchering_1/Butchering1.png",
            imageStyle: "50% 60%",
            description: "<p>Inspired by alarming Federal Trade Commission statistics revealing $1.14 billion lost to romance scams, <strong>Butchering</strong> series exposes the emotional devastation of these predatory schemes. The artwork illuminates this often-overlooked issue and contribute to the broader conversation about the interplay between dreams and reality in the online world.</p>",
            details: {
                dimensions: "5.56 × 7.96 inches",
                materials: "Digital",
                created: "May 2024",
                collection: "Excellence Award 2024 International Art Competition"
            },
            gallery:[ 
            
                [
                    {
                        src: "images/Butchering_1/animation-butchering1.gif",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },
                    {
                        src: "images/Butchering_2/animation-butchering2.gif",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },

                ],
            ]
        },

        // Butchering 2
        {
            title: "Butchering",
            subtitle: "Editorial, 2024",
            mainImage: "images/Butchering_2/Butchering2.png",
            imageStyle: "50% 65%",
            description: "<p>Inspired by alarming Federal Trade Commission statistics revealing $1.14 billion lost to romance scams, <strong>Butchering</strong> series exposes the emotional devastation of these predatory schemes. The artwork illuminates this often-overlooked issue and contribute to the broader conversation about the interplay between dreams and reality in the online world.</p>",
            details: {
                dimensions: "5.56 × 7.96 inches",
                materials: "Digital",
                created: "May 2024",
                collection: "Excellence Award 2024 International Art Competition"
            },
            gallery:[ 
            
                [
                    {
                        src: "images/Butchering_1/animation-butchering1.gif",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },
                    {
                        src: "images/Butchering_2/animation-butchering2.gif",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },

                ],

                [
                    

                    {
                        src: "images/Butchering_2/Exhibition2.png",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 12,
                    },

                    {
                        src: "images/Butchering_2/Exhibition1.png",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },

                    {
                        src: "images/Butchering_2/Exhibition3.png",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 6,
                    },

                ],
            ]
        },

        // Crimson Tide
        {
            title: "Crimson Tide (赤潮 ChiChao)",
            subtitle: "Commercial, 2025",
            mainImage: "images/Crimson_Tide/CrimsonTide.png",
            imageStyle: "100% 20%",
            description: "<p>A majestic Chinese dragon, its scales intricately patterned with the emblem of Peking University (PKU), surges forward through roaring waves. Propelled by the synchronized strength of alumni rowers, the dragon boat slices through turbulent waters — each powerful stroke a testament to unity, resilience, and the enduring cultural legacy of PKU. <p>As the client beautifully states:</p><blockquote><p><em>\"No tide is too fierce for those who carry the dragon's spirit. This spirit is vividly brought to life in Bingyu's creative language. Her creative vision shines through in every detail. I fall in love with the creative design of the dragon's scales, seamlessly blending tradition, identity, and symbolic power.\"</em></p></blockquote>",
            details: {
                dimensions: "3402 × 2398 px",
                materials: "Digital",
                created: "Jan 2025",
                collection: "Commercial Project for  Dragon Boat Team of Peking University Alumni Association - New England"
            },
            gallery:[ 

                [
                    {
                        src: "images/Crimson_Tide/animation-CrimsonTide.gif",
                        type: "landscape", 
                        span: 12,
                    },

                ],
              
            
                [
                    {
                        src: "images/Crimson_Tide/Outline.png",
                        type: "landscape", 
                        span: 12,
                    },
                ],

                [
                    {
                        src: "images/Crimson_Tide/CrimsonTide.png",
                        type: "landscape", 
                        span: 12,
                    },

                ],

                [
                    {
                        src: "images/Crimson_Tide/Mockup2.png",
                        type: "landscape", // or whatever type fits the GIF's dimensions
                        span: 12,
                    },

                ],

            ]
        },



        // More artwork entries...
    ];
    
    // Function to update the modal with artwork data
    function updateModal(index) {
        const artwork = artworkData[index] || {
            title: "Artwork Title",
            subtitle: "Medium, Year",
            mainImage: "/api/placeholder/600/700",
            description: "<p>Description not available.</p>"
        };
        
        // Update modal content with animation
        modal.classList.add('updating');
        
        setTimeout(() => {
            modalMainImage.src = artwork.mainImage;
            modalMainImage.alt = artwork.title;
            modalTitle.textContent = artwork.title;
            modalSubtitle.textContent = artwork.subtitle;
            modalDescription.innerHTML = artwork.description;
            modalMainImage.style.objectPosition = artwork.imageStyle;

            // // Example if you're using a property called "imageStyle"
            // if (artwork.imageStyle) {
            //     modalMainImage.style.objectPosition = artwork.imageStyle;
            //     // console.log('Applied imageStyle:', artwork.imageStyle);
            // } else {
            //     modalMainImage.style.objectPosition = "center center";
            //     // console.log('Applied imageStyle:', artwork.imageStyle);
            // }

                        
            // Update details tab if data exists
            if (artwork.details) {
                document.querySelector('.artwork-dimensions').textContent = artwork.details.dimensions || 'N/A';
                document.querySelector('.artwork-materials').textContent = artwork.details.materials || 'N/A';
                document.querySelector('.artwork-date').textContent = artwork.details.created || 'N/A';
                document.querySelector('.artwork-collection').textContent = artwork.details.collection || 'N/A';
            }
            
            // Update artist statement if exists
            if (artwork.statement) {
                document.querySelector('.modal-artist-statement').innerHTML = artwork.statement;
            }
            
            // Update the gallery images function in updateModal
            if (artwork.gallery && artwork.gallery.length > 0) {
                const imageGrid = document.querySelector('.modal-image-grid');
                imageGrid.innerHTML = '';
                
                // Reset classes
                imageGrid.className = 'modal-image-grid';
                
                // Process each row
                artwork.gallery.forEach((rowData, rowIndex) => {
                    // Create a row container
                    const rowElement = document.createElement('div');
                    rowElement.className = 'gallery-row';
                    
                    // Special case for single image in a row
                    if (rowData.length === 1) {
                        const imgData = rowData[0];
                        
                        // If it's a hero type or set as full width, make it span entire row
                        if (imgData.type === 'hero' || imgData.fullWidth) {
                            rowElement.style.gridTemplateColumns = '1fr';
                        }
                    }
                    
                    // Process each image in the row
                    rowData.forEach((itemData, itemIndex) => {
                        let itemElement;
                        
                        // Check if this is a video or an image
                        if (itemData.type === 'video') {
                            // Create a video container
                            const videoContainer = document.createElement('div');
                            videoContainer.className = 'video-container';
                            videoContainer.style.gridColumn = `span ${itemData.span || 12}`; // Default to full width
                            
                            // Check if it's a vertical video
                            if (itemData.vertical) {
                                videoContainer.classList.add('vertical');
                            }

                            // Handle different video types
                            if (itemData.videoType === 'youtube') {
                                // Create YouTube iframe
                                const iframe = document.createElement('iframe');
                                iframe.src = `https://www.youtube.com/embed/${itemData.videoId}?rel=0&modestbranding=1`;
                                iframe.setAttribute('allowfullscreen', '');
                                iframe.setAttribute('loading', 'lazy');
                                
                                // If thumbnail provided, show it with play button first
                                if (itemData.thumbnail) {
                                    const thumbnailImg = document.createElement('img');
                                    thumbnailImg.src = itemData.thumbnail;
                                    thumbnailImg.alt = itemData.caption || "Video thumbnail";
                                    thumbnailImg.style.width = '100%';
                                    thumbnailImg.style.height = '100%';
                                    thumbnailImg.style.objectFit = 'cover';
                                    thumbnailImg.style.position = 'absolute';
                                    
                                    // Add play button
                                    const playButton = document.createElement('div');
                                    playButton.className = 'play-button';
                                    playButton.innerHTML = '<i class="fas fa-play"></i>';
                                    
                                    videoContainer.appendChild(thumbnailImg);
                                    videoContainer.appendChild(playButton);
                                    
                                    // Replace thumbnail with iframe on click
                                    videoContainer.addEventListener('click', function() {
                                        this.innerHTML = '';
                                        this.appendChild(iframe);
                                    });
                                } else {
                                    // No thumbnail, just add the iframe
                                    videoContainer.appendChild(iframe);
                                }
                            } else if (itemData.videoType === 'local') {
                                // Create HTML5 video element
                                const video = document.createElement('video');
                                video.controls = true;
                                video.preload = 'metadata';
                                
                                if (itemData.poster) {
                                    video.poster = itemData.poster;
                                }
                                
                                // Add source
                                const source = document.createElement('source');
                                source.src = itemData.videoSrc;
                                source.type = `video/${itemData.videoSrc.split('.').pop()}`; // Derive MIME type from extension
                                
                                video.appendChild(source);
                                videoContainer.appendChild(video);
                            }
                            
                            // Add caption if provided
                            if (itemData.caption) {
                                const caption = document.createElement('p');
                                caption.className = 'video-caption';
                                caption.textContent = itemData.caption;
                                
                                // Create a wrapper for video and caption
                                const wrapper = document.createElement('div');
                                wrapper.style.gridColumn = `span ${itemData.span || 12}`;
                                wrapper.appendChild(videoContainer);
                                wrapper.appendChild(caption);
                                
                                itemElement = wrapper;
                            } else {
                                itemElement = videoContainer;
                            }
                        } else {
                            // This is a regular image - use the existing image code
                            let imgSrc, imgType, imgCaption, imgAlign, imgSpan;
                            
                            // If the gallery item is just a string, it's a simple image path
                            if (typeof itemData === 'string') {
                                imgSrc = itemData;
                                imgSpan = 6; // Default to half-width
                            } 
                            // If it's an object, it has additional metadata
                            else {
                                imgSrc = itemData.src;
                                imgType = itemData.type; // One of the CSS class names
                                imgCaption = itemData.caption; // Optional caption
                                imgAlign = itemData.align; // Optional alignment
                                imgSpan = itemData.span || 6; // How many columns to span (out of 12)
                                
                                // Automatically determine span based on type if not specified
                                if (!itemData.span) {
                                    switch(imgType) {
                                        case 'hero': 
                                            imgSpan = 12; // Full width
                                            break;
                                        case 'panorama':
                                        case 'wide':
                                            imgSpan = 8; // 2/3 width
                                            break;
                                        case 'landscape':
                                            imgSpan = 6; // 1/2 width
                                            break;
                                        case 'portrait':
                                        case 'small-square':
                                            imgSpan = 4; // 1/3 width
                                            break;
                                        case 'feature':
                                            imgSpan = 12; // Full width
                                            break;
                                        default:
                                            imgSpan = 6; // Default half width
                                    }
                                }
                            }
                            
                            const img = document.createElement('img');
                            img.src = imgSrc;
                            img.alt = imgCaption || "Detail image for " + artwork.title;
                            img.classList.add('modal-detail-image');
                            
                            // Set the grid column span based on the image type
                            img.style.gridColumn = `span ${imgSpan}`;
                            
                            // Add size class if specified
                            if (imgType) {
                                img.classList.add(imgType);
                            }
                            
                            // Add alignment class if specified
                            if (imgAlign) {
                                img.classList.add('align-' + imgAlign);
                            }
                            
                            // If there's a caption, add it
                            if (imgCaption) {
                                const caption = document.createElement('p');
                                caption.className = 'video-caption'; // Reuse the same caption style
                                caption.textContent = imgCaption;
                                
                                // Create a wrapper for image and caption
                                const wrapper = document.createElement('div');
                                wrapper.style.gridColumn = `span ${imgSpan}`;
                                wrapper.appendChild(img);
                                wrapper.appendChild(caption);
                                
                                itemElement = wrapper;
                            } else {
                                itemElement = img;
                            }
                        }
                        
                        rowElement.appendChild(itemElement);
                    });
                    
                    imageGrid.appendChild(rowElement);
                });
            }
            
            // Reset tabs to show first tab
            modalTabs.forEach(tab => tab.classList.remove('active'));
            modalTabContents.forEach(content => content.classList.remove('active'));
            modalTabs[0].classList.add('active');
            modalTabContents[0].classList.add('active');
            
            modal.classList.remove('updating');
        }, 300);
    }
    
    // Set up tab functionality
    modalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabTarget = this.getAttribute('data-tab');
            
            // Only proceed if not already active
            if (!this.classList.contains('active')) {
                // Update active tab
                modalTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Hide all content first
                modalTabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show selected content
                const activeContent = document.querySelector(`.modal-tab-content[data-tab="${tabTarget}"]`);
                activeContent.classList.add('active');
            }
        });
    });
    
    // Initialize modal events
    function initModalEvents() {
        // Hook up gallery items to modal
        galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentIndex = index;
                updateModal(currentIndex);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            });
        });
        
        // Close button functionality
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
        
        // Click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
        
        // Previous button
        modalPrev.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateModal(currentIndex);
        });
        
        // Next button
        modalNext.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateModal(currentIndex);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateModal(currentIndex);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateModal(currentIndex);
            }
        });
    }
    
    // Initialize modal system
    initModalEvents();
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('mouseenter', function() {
            cursorDot.classList.add('on-modal');
        });
        
        modalContent.addEventListener('mouseleave', function() {
            cursorDot.classList.remove('on-modal');
        });
    }
    
    modalContent.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    modalContent.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateModal(currentIndex);
        }
        
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateModal(currentIndex);
        }
    }
    
    // Public API for future updates
    window.modalSystem = {
        open: function(index) {
            currentIndex = index;
            updateModal(currentIndex);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        },
        close: function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        },
        updateData: function(newArtworkData) {
            Object.assign(artworkData, newArtworkData);
        },
        addArtwork: function(artwork) {
            artworkData.push(artwork);
        }
    };
}

// Animations
function initAnimations() {
    // Fade-in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    // Set initial state for stagger items
    staggerItems.forEach((item, index) => {
        item.style.animationDelay = `${0.1 * index}s`;
    });
    
    function checkFade() {
        // Fade in elements
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
        
        // Stagger animations
        staggerItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 50) {
                item.classList.add('visible');
            }
        });
    }
    
    // Check animations on scroll and load
    window.addEventListener('scroll', checkFade);
    window.addEventListener('load', checkFade);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without reload
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Custom cursor
function initCursor() {
    cursorDot = document.querySelector('.cursor-dot');
    const heroSection = document.querySelector('.hero');

    // The .logo selector is intentionally missing from this list 
    // because we handle it separately below
    const interactiveElements = document.querySelectorAll(`
        .gallery-item,
        .cta-button.fade-in-button,
        button[type="submit"],
        .filter-button,
        .modal-tab,
        nav ul li a,
        .contact-link,
        .modal-section h4,
        .contact-tab
    `);
        
    // Move cursor with mouse
    document.addEventListener('mousemove', function(e) {
        // Add a small delay for a smoother movement
        requestAnimationFrame(() => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
    });
    
    // Show/hide cursor based on mouse movement
    let cursorTimeout;
    document.addEventListener('mousemove', function() {
        cursorDot.classList.remove('hidden');
        clearTimeout(cursorTimeout);
        
        cursorTimeout = setTimeout(() => {
            if (!cursorDot.matches(':hover')) {
                cursorDot.classList.add('hidden');
            }
        }, 3000);
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', function() {
        cursorDot.classList.add('hidden');
    });
    
    // Add hover effect for interactive elements
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorDot.classList.add('expanded');
            
            // Change icon based on element type
            if (this.classList.contains('gallery-item')) {
                document.querySelector('.cursor-icon').className = 'cursor-icon fas fa-circle-dot';
            } else {
                document.querySelector('.cursor-icon').className = 'cursor-icon fas fa-circle-dot';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            cursorDot.classList.remove('expanded');
        });
    });
    
    // Special handling for logo cursor
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            // Check if we're past the hero section
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            
            if (heroBottom <= 0) {
                // Past hero section - show circle-dot cursor
                cursorDot.classList.add('expanded');
                document.querySelector('.cursor-icon').className = 'cursor-icon fas fa-circle-dot';
            }
            // When in hero section, don't add 'expanded' class at all
        });
        
        logo.addEventListener('mouseleave', function() {
            cursorDot.classList.remove('expanded');
        });
    }
    
    // Add click animation
    document.addEventListener('mousedown', function() {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.9)';
    });
    
    document.addEventListener('mouseup', function() {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// About section animation
function initAboutSection() {
    const aboutSection = document.getElementById('about');
    const aboutImage = document.querySelector('.about-image');
    
    // Set up the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When the about section enters the viewport
            if (entry.isIntersecting) {
                aboutImage.classList.add('scale-up');
            } else {
                aboutImage.classList.remove('scale-up');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px'
    });
    
    // Start observing the about section
    observer.observe(aboutSection);
}

// Contact form functionality with EmailJS
function initContactForm() {
    // YOUR EMAILJS CONFIGURATION
    const EMAILJS_SERVICE_ID = 'service_dinpclc'; // Replace with your service ID
    const EMAILJS_SUBSCRIPTION_TEMPLATE = 'template_qwehn6o'; // Replace
    const EMAILJS_MESSAGE_TEMPLATE = 'template_rwus2et'; // Replace

    // Handle subscription form
    const subscriptionForm = document.querySelector('.subscription-form');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            const email = this.querySelector('input[name="subscriber_email"]').value;
            
            // Update button
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            // Prepare template parameters
            const templateParams = {
                subscriber_email: email,
                subscription_date: new Date().toLocaleDateString()
            };
            
            // Send email using EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_SUBSCRIPTION_TEMPLATE, templateParams)
                .then(function(response) {
                    // Success!
                    console.log('SUCCESS!', response.status, response.text);
                    button.textContent = 'Subscribed! ✓';
                    button.style.backgroundColor = '#4CAF50';
                    subscriptionForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.backgroundColor = '';
                        button.disabled = false;
                    }, 3000);
                }, function(error) {
                    // Error
                    console.log('FAILED...', error);
                    button.textContent = 'Error - Try Again';
                    button.style.backgroundColor = '#f44336';
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.backgroundColor = '';
                        button.disabled = false;
                    }, 3000);
                });
        });
    }
    
    // Handle contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Update button
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Get form values
            const templateParams = {
                from_name: this.querySelector('input[name="from_name"]').value,
                from_email: this.querySelector('input[name="from_email"]').value,
                subject: this.querySelector('input[name="subject"]').value || 'No Subject',
                message: this.querySelector('textarea[name="message"]').value
            };
            
            // Send email
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_MESSAGE_TEMPLATE, templateParams)
                .then(function(response) {
                    // Success!
                    console.log('SUCCESS!', response.status, response.text);
                    button.textContent = 'Message Sent! ✓';
                    button.style.backgroundColor = '#4CAF50';
                    contactForm.reset();
                    
                    // Reset button
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.backgroundColor = '';
                        button.disabled = false;
                    }, 3000);
                }, function(error) {
                    // Error
                    console.log('FAILED...', error);
                    button.textContent = 'Error - Try Again';
                    button.style.backgroundColor = '#f44336';
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.backgroundColor = '';
                        button.disabled = false;
                    }, 3000);
                });
        });
    }
    
    // Handle tab switching
    const contactTabs = document.querySelectorAll('.contact-tab');
    const contactTabContents = document.querySelectorAll('.contact-tab-content');
    
    contactTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabTarget = this.getAttribute('data-tab');
            
            if (!this.classList.contains('active')) {
                contactTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                contactTabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                const activeContent = document.querySelector(`.contact-tab-content[data-tab="${tabTarget}"]`);
                activeContent.classList.add('active');
            }
        });
    });
}

// Modern transparent overlay scrollbar functionality
function initScrollbarVisibility() {
    const mainScrollbar = document.getElementById('main-scrollbar');
    const modalScrollbar = document.getElementById('modal-scrollbar');
    const modal = document.querySelector('.modal');
    
    let mainScrollTimeout;
    let modalScrollTimeout;
    
    // Calculate and update main page scrollbar
    function updateMainScrollbar() {
        if (!mainScrollbar) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = scrollTop / scrollHeight;
        
        const thumb = mainScrollbar.querySelector('.custom-scrollbar-thumb');
        const trackHeight = mainScrollbar.offsetHeight;
        const thumbHeight = Math.max(30, (window.innerHeight / document.documentElement.scrollHeight) * trackHeight);
        const thumbTop = scrollPercentage * (trackHeight - thumbHeight);
        
        thumb.style.height = thumbHeight + 'px';
        thumb.style.top = thumbTop + 'px';
        
        // Show scrollbar
        mainScrollbar.classList.add('visible');
        
        // Clear existing timeout
        clearTimeout(mainScrollTimeout);
        
        // Hide scrollbar after 2 seconds of no scrolling
        mainScrollTimeout = setTimeout(() => {
            mainScrollbar.classList.remove('visible');
        }, 500);
    }
    
    // Calculate and update modal scrollbar
    function updateModalScrollbar() {
        if (!modalScrollbar || !modal || !modal.classList.contains('active')) return;
        
        const scrollTop = modal.scrollTop;
        const scrollHeight = modal.scrollHeight - modal.clientHeight;
        
        if (scrollHeight <= 0) {
            modalScrollbar.classList.remove('visible');
            return;
        }
        
        const scrollPercentage = scrollTop / scrollHeight;
        
        const thumb = modalScrollbar.querySelector('.custom-scrollbar-thumb');
        const trackHeight = modalScrollbar.offsetHeight;
        const thumbHeight = Math.max(30, (modal.clientHeight / modal.scrollHeight) * trackHeight);
        const thumbTop = scrollPercentage * (trackHeight - thumbHeight);
        
        thumb.style.height = thumbHeight + 'px';
        thumb.style.top = thumbTop + 'px';
        
        // Show scrollbar
        modalScrollbar.classList.add('visible');
        
        // Clear existing timeout
        clearTimeout(modalScrollTimeout);
        
        // Hide scrollbar after 2 seconds of no scrolling
        modalScrollTimeout = setTimeout(() => {
            modalScrollbar.classList.remove('visible');
        }, 2000);
    }
    
    // Main page scroll handler
    function handleMainScroll() {
        requestAnimationFrame(updateMainScrollbar);
    }
    
    // Modal scroll handler
    function handleModalScroll() {
        requestAnimationFrame(updateModalScrollbar);
    }
    
    // Add event listeners
    window.addEventListener('scroll', handleMainScroll, { passive: true });
    window.addEventListener('resize', updateMainScrollbar, { passive: true });
    
    if (modal) {
        modal.addEventListener('scroll', handleModalScroll, { passive: true });
    }
    
    // Clean up when modal closes
    function cleanupModal() {
        if (modalScrollbar) {
            modalScrollbar.classList.remove('visible');
        }
        clearTimeout(modalScrollTimeout);
    }
    
    // Modal close events
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', cleanupModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                cleanupModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            cleanupModal();
        }
    });
    
    // Initialize main scrollbar on load
    setTimeout(updateMainScrollbar, 100);
}
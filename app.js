const store = {
    bookmarks: [
        {
            id: 'x56w',
            title: 'Title 1',
            rating: 3,
            url: 'http://www.title1.com',
            description: 'lorem ipsum dolor sit',
            expanded: false
          },
          {
            id: '6ffw',
            title: 'Title 2',
            rating: 5,
            url: 'http://www.title2.com',
            description: 'dolorum tempore deserunt',
            expanded: false
          } 
    ],
    adding: false,
    error: null,
    filter: 0
};

const toggleAppTools = () => {
// Toggle the app tools displayed.

    $ ( 'main' ).on ( 'click', '.app-tool-icon', e => {

        let iconSrc = e.currentTarget.id.slice ( 5, e.currentTarget.id.length );

        // Add tool.
        if ( iconSrc === 'bookmark' ) {

            store.adding = true;

            render();

        }

        // Search tool.
        else if ( iconSrc === 'search' ) {

            $ ( '.search-container' ).css ( 'display', 'block' );
            $ ( '.filter-select-container' ).css ( 'display', 'none' );

        }
    
        // Filter tool.
        else if ( iconSrc === 'filter' ) {

            $ ( '.filter-select-container' ).css ( 'display', 'block' );
            $ ( '.search-container' ).css ( 'display', 'none' );

        }

    });

};

const toggleExpandBookmark = () => {
// Expands the bookmark info.

    $ ( 'main' ).on ( 'click', '.bookmarks-heading', e => {

        if ( $ ( e.currentTarget ).parent ().children ().last ().css ( 'display') == 'block'  ){

            $ ( e.currentTarget ).parent ().children ().last ().css ( 'display','none' );          

        }

        else $ ( e.currentTarget ).parent ().children ().last ().css ( 'display','block' );

    });

};

const BookmarkListScreenHTML = () => {
    let str = [];
    store.bookmarks.forEach( ( item, index ) => {
        if ( store.filter === 0 || item.rating == store.filter ) {
            str.push ( `
                <li class="bookmarks-list-li" id="${ item.id }">
                    <div class="bookmarks-heading">
                        <div class="bookmarks-title-container">
                            <h3>${ item.title }</h3>
                        </div>
                        <div class="bookmarks-rating-container">
                            <img class="bookmarks-rating-img" src="img/${ item.rating }-stars.png" alt="${ item.rating } Star Rating">
                        </div>
                    </div>
                    <div class="bookmarks-info-container">
                        <div class="bookmarks-link-container">
                            <a class="bookmarks-link" href="${ item.url }">
                                Visit Site
                            </a>
                        </div>
                        <div class="bookmarks-description-container">
                            ${ item.description }
                        </div>
                        <div class="bookmarks-trash-icon-container">
                            <img class="bookmarks-trash-icon" src="img/icon-trash.png" alt="Delete this bookmark">
                        </div>
                    </div>
                </li>`);
        }

    });

    return `
    				<div id="bookmarks-list-container">

						<ul id="bookmarks-list-ul">

							${ str.join('') }

						</ul>

					</div>`;
        
};

const AddBookmarkScreenHTML = () => {
    return `
    				<div id="add-bookmark-container">

                        <div id="title-your-bookmark-container">

                            <label for="add-bookmark-title" id="add-bookmark-title-label" name="add-bookmark-title-label">Add A Bookmark Title</label>

                            <input type="text" id="add-bookmark-title" name="add-bookmark-title" placeholder="Enter title here">
                    
                        </div>

                        <div id="link-your-bookmark-container">

                            <label for="add-bookmark-url" id="add-bookmark-url-label" name="add-bookmark-url-label">Add A Bookmark URL</label>
            
                            <input type="text" id="add-bookmark-url" name="add-bookmark-url" placeholder="Enter URL here">
                
                        </div>

                        <div id="rate-your-bookmark-container">

                            <input type="hidden" value="0" id="bookmark-rating" name="bookmark-rating">

                            <div class="rate-your-bookmark-star-container">
                                <img class="rate-your-bookmark-star-hollow" id="star-rating-1" src="img/icon-star-hollow.png">
                            </div>

                            <div class="rate-your-bookmark-star-container">
                                <img class="rate-your-bookmark-star-hollow" id="star-rating-2" src="img/icon-star-hollow.png">
                            </div>

                            <div class="rate-your-bookmark-star-container">
                                <img class="rate-your-bookmark-star-hollow" id="star-rating-3" src="img/icon-star-hollow.png">
                            </div>

                            <div class="rate-your-bookmark-star-container">
                                <img class="rate-your-bookmark-star-hollow" id="star-rating-4" src="img/icon-star-hollow.png">
                            </div>

                            <div class="rate-your-bookmark-star-container">
                                <img class="rate-your-bookmark-star-hollow" id="star-rating-5" src="img/icon-star-hollow.png">
                            </div>
                        
                        </div>

                        <div id="describe-your-bookmark-container">

                            <label for="add-bookmark-description" id="add-bookmark-description-label" name="add-bookmark-description-label">Add A Bookmark Description</label>
                            
                            <textarea name="add-bookmark-description" id="add-bookmark-description" placeholder="Enter your description here" rows="4"></textarea>

                        </div>

                        <div id="bookmarks-form-buttons-container">

                        <input type="reset" value="Cancel">
                        <input type="submit" value="Create">

                        </div>

					</div>`;
        
};

const filterBookmarks = () => {
// Set the rating filter.

    $ ( 'main' ).on ( 'change', '#filter-select', function ( e ) {
        
        if ( $ ( this ).val ().charAt ( 0 ) !== 'F' || $ ( this ).val ().charAt ( 0 ) !== 'a' ) store.filter = $ ( this ).val ().charAt ( 0 );
        
        if ( $ ( this ).val ().charAt ( 0 ) === 'a' ) store.filter = 0;

        render ();

   });

};

const rateBookmark = () => {
// Adjusts the star rating of the bookmark being added.

    $ ( 'main' ).on ( 'click', '.rate-your-bookmark-star-hollow', e => {
        
        // Get the element id.
        let index = $( e.currentTarget ).attr ('id');
        
        // Create an index from the element id.
        index = index.charAt ( index.length - 1 );
        
        // Set the hidden input val for submission
        $ ( '#bookmark-rating' ).attr ( 'value', index );

        // Reset UI elements.
        for ( i = 0; i < 5; i++) $ ( `#star-rating-${ i + 1 }` ).attr ( 'src', 'img/icon-star-hollow.png' );

        // Set UI elements.
        for ( i = 0; i < index; i++) $ ( `#star-rating-${ i + 1 }` ).attr ( 'src', 'img/icon-star-filled.png' );

    });

};

const addBookmark = () => {

    $ ( 'main' ).on ( 'submit', '#bookmarks-form', e => {
		
		//console.log ( 'formSubmitHandler started' );

        e.preventDefault ();

        alert ( 'form submit' );

    });

};

const deleteBookmark = () => {

    $ ( '.bookmarks-trash-icon' ).on ( 'click', e => {

        let bookmarkId = $ ( e.currentTarget ).parent ().parent ().parent ().attr ( 'id' );

        let newBookmarksList = [];

        console.log ( newBookmarksList.length );

        store.bookmarks.forEach ( element => {

           if ( element.id !== bookmarkId ) newBookmarksList.push ( element );

        });

        console.log ( newBookmarksList.length );

        store.bookmarks = [ ...newBookmarksList ];

        render ();

    });

};

const resetAddBookmark = () => {
// Cancel adding a new bookmark.

    $ ( 'main' ).on ( 'reset', '#bookmarks-form', e => {

        e.preventDefault ();
        
        store.adding = false;
        
        render ();

    });

};

const render = () => {
// Render the page.
    let h2 = '';

    if ( store.adding === false ) h2 = 'My Bookmarks';

    else h2 = 'Add A Bookmark';

    let htmlOpen = `
    <div id="form-container">
				
        <form id="bookmarks-form" name="bookmarks-form">

		    <legend for="bookmarks"><h2>${ h2 }</h2></legend>

		    <div id="app-tools">

				<div class="app-tools-item">
					<img class="app-tool-icon" id="icon-bookmark" src="img/icon-bookmark.png">
				</div>

				<div class="app-tools-item">
					<img class="app-tool-icon" id="icon-search" src="img/icon-search.png">
				</div>

				<div class="app-tools-item">
					<img class="app-tool-icon" id="icon-filter" src="img/icon-filter.png">
				</div>
						
				<div class="app-tools-item search-label-container">
					<label for="search-button" id="search-label" name="search-label">search</label>
				</div>

				<div class="app-tools-item search-container">

					<input type="text" id="search-text-input" name="search-text-input" placeholder="Search">
					<input type="button" id="search-button" name="search-button" value="Go">

				</div>

                <div class="app-tools-item filter-label-container">
					<label for="bookmarks" id="filter-label" name="filter-label">Filter</label>
                </div>
                
				<div class="filter-select-container">

					<select name="filter-select" id="filter-select">
								
                        <option selected>Filter</option>
                        
                        <option value="a-star">All</option>

						<option value="1-star">1 Star</option>
								
						<option value="2-star">2 Stars</option>
								
						<option value="3-star">3 Stars</option>
							
						<option value="4-star">4 Stars</option>
								
						<option value="5-star">5 Stars</option>
						<!--
						<option value="alphabetical-forward">A - Z</option>

						<option value="alphabetical-reverse">Z - A</option>

                        <option value="date-forward">Newest to Oldest</option>

						<option value="date-reverse">Oldest to Newest</option>

						<option value="date-reverse">Category</option>
						-->
					</select>

                </div>
                
            </div>`;

    let htmlMiddle ='';
    
    let htmlClose = `
    
        </form>

    </div>`;

    // State 0 - Display the list of bookmarks.
    if ( store.adding === false ) {

        $ ( 'main' ).html ( `${ htmlOpen }${ BookmarkListScreenHTML ( htmlMiddle ) }${ htmlClose }` );

    }

    // State 1 - Display the add bookmark screen.
    if ( store.adding === true ) {

        $ ( 'main' ).html ( `${ htmlOpen }${ AddBookmarkScreenHTML ( htmlMiddle ) }${ htmlClose }` );

    }
    
};

const bindEventHandlers = () => {
// Bind event handlers.

    //console.log ( 'bindEventHandlers started' );
    
    //
    toggleAppTools ();

    //
    toggleExpandBookmark ()

    //
    filterBookmarks ();

    //
    rateBookmark ();

    //
    addBookmark ();

    //
    deleteBookmark ();

    //
    resetAddBookmark ();

    //console.log ( 'bindEventHandlers completed' );
    
};

const init = () => {
// Initialized app.
    
    render ();

    bindEventHandlers ();

};

// On page load, call init ().
$ ( init );
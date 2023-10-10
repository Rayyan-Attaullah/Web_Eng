

$(document).ready(function() {
  
          var jobListings = []; 
          
           function addJobCard(jobData) {
   
            var jobCard = $('<div>').addClass('job-card job-card2'); 

    jobCard.html(`
      <img class="profile-img" src="${jobData.logo}" alt="Job Image">
      <div class="job-description">
        <div class="job-info1">
          <p>${jobData.company}</p>
          ${jobData.new ? '<button class="b1">New!</button>' : ''}
          ${jobData.featured ? '<button class="b2">Featured</button>' : ''}
        </div>
        <div class="job-title">
          <p>${jobData.position}</p>
        </div>
        <div class="job-info2">
          <p>${jobData.postedAt}</p>
          <p>&#183;</p>
          <p>${jobData.contract}</p>
          <p>&#183;</p>
          <p>${jobData.location}</p>
        </div>
      </div>
      <div class="job-tags">
        <div class="tags">
          ${jobData.languages.map(language => `<button>${language}</button>`).join(' ')}
          ${jobData.tools.map(tool => `<button>${tool}</button>`).join(' ')}
        </div>
      </div>
    `);


    
    jobCard.on('click', function() {
      
      displayJobDetails(jobData);
    });

    $('.main-content').append(jobCard);

  }



  var $addJobButton = $('#add-job-button');
  var $addJobForm = $('#add-job-form');
  

  $addJobButton.on('click', function() {
    
    $addJobForm.show();
  });

  $addJobForm.on('submit', function(event) {

    event.preventDefault(); 
  
    
    var newJobData = {
      position: $('#job-title').val(),
      company: $('#company').val(),
      role: $('#role').val(),
      level: $('#level').val(),
      postedAt: $('#posted-at').val(),
      contract: $('#contract').val(),
      location: $('#location').val(),
      languages: $('#languages').val().split(','),
      tools: $('#tools').val().split(','),
      logo: './images/default-image.png', 
      new: true, 
      featured: false, 
    };
    
    var newJobCard = $('<div>').addClass('job-card job-card2');
    newJobCard.html(`
      <img class="profile-img" src="${newJobData.logo}" alt="Job Image">
      <div class="job-description">
        <div class="job-info1">
          <p>${newJobData.company}</p>
          ${newJobData.new ? '<button class="b1">New!</button>' : ''}
          ${newJobData.featured ? '<button class="b2">Featured</button>' : ''}
        </div>
        <div class="job-title">
          <p>${newJobData.position}</p>
        </div>
        <div class="job-info2">
          <p>${newJobData.postedAt}</p>
          <p>&#183;</p>
          <p>${newJobData.contract}</p>
          <p>&#183;</p>
          <p>${newJobData.location}</p>
        </div>
      </div>
      <div class="job-tags">
        <div class="tags">
          ${newJobData.languages.map(language => `<button>${language}</button>`).join(' ')}
          ${newJobData.tools.map(tool => `<button>${tool}</button>`).join(' ')}
        </div>
      </div>
    `);
    
    $('.main-content').append(newJobCard);
    $('#add-job-form-popup').hide();
    
    // Clear the form fields after submission
    $('#job-title').val('');
    $('#company').val('');
    $('#role').val('');
    $('#level').val('');
    $('#posted-at').val('');
    $('#contract').val('');
    $('#location').val('');
    $('#languages').val('');
    $('#tools').val('');
    $('#logo').val('');

    jobListings.push(newJobData);


  });




  $('.close-button').on('click', function() {
    $addJobForm.hide();
  });
  



  function displayJobDetails(jobData) {
   
    var modal = $('<div>').addClass('job-details-modal');
  
    
    var modalContent = $('<div>').addClass('modal-content');
    modalContent.html(`
      <span class="close-button">×</span>
      <h2>${jobData.position}</h2>
      <p>Company: ${jobData.company}</p>
      <p>Posted At: ${jobData.postedAt}</p>
      <p>Contract: ${jobData.contract}</p>
      <p>Location: ${jobData.location}</p>
      <p>Languages: ${jobData.languages.join(', ')}</p>
      <p>Tools: ${jobData.tools.join(', ')}</p>
    `);
  
    


    modal.append(modalContent);
    $('#job-details-popup').html(modal);
    $('#job-details-popup').show();
    modalContent.find('.close-button').on('click', function() {
      $('#job-details-popup').hide();
    });
  }
  
  function loadJobListings() {
    
    $.getJSON('data.json', function(data) {
      
      jobListings = data;

     
      jobListings.forEach(function(jobData) {
        addJobCard(jobData);
      });
    });
  }

  loadJobListings();

  $('.filter-select').on('click', function() {
    var category = $(this).data('filter');
    var value = $(this).val();

    var filteredListings = jobListings.filter(function(job) {
        if (category === "languages" || category === "tools") {
            return job[category].includes(value); 
        } else {
            return job[category] === value;
        }
    });

    console.log(filteredListings);

    displayJobListings(filteredListings);
});

function displayJobListings(listings) {
    $('.job-card2, .job-card1').remove();
    listings.forEach(function(jobData) {
        addJobCard(jobData);
    });
}

  

  function deleteJob(index) {
   
              jobListings.splice(index, 1);
              displayJobListings(jobListings);
  }

  $('.delete-button').on('click', function() {
    var index = $(this).data('index'); 
    deleteJob(index);
  });

});

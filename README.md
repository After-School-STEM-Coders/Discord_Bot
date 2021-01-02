  # welcome roles branch

  ## What is the intention for the +rules command?
  
   1) When a user reacts to the welcome message in `#Welcome` channel, that user should be given the role "Welcomed"
   2) When a user no longer has any remaining emoji reactions to the welcome message in `#Welcome`, that user should have the "Welcomed" role removed.
  
  ## Primary maintainers of the roles_command branch:
  
   - @rckoepke
   
  ## Todo list:
 
   - Implement messageReactionAdd.js
   - Implement messageReactionRemove.js
   - Eventually, provide a functionality to reset all users and force them to acknowledge welcome message again. This command should only be available to server owner/designated roles.
   
   
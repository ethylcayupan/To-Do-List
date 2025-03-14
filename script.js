var app = new function() {
    this.tasks = [];
    this.tasksList = document.getElementById('tasks-list');
    this.emptyState = document.getElementById('empty-state');
    this.editModal = document.getElementById('edit-modal');
    this.editIndex = document.getElementById('edit-index');
    
    this.loadTasks = function() {
      const savedTasks = localStorage.getItem('todoTasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
      this.FetchAll();
    };
    
    this.saveTasks = function() {
      localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    };
    
    this.FetchAll = function() {
      let html = '';
      
      if (this.tasks.length > 0) {
        this.emptyState.style.display = 'none';
        
        for (let i = 0; i < this.tasks.length; i++) {
          html += `<div class="task-item">
                    <div class="task-text">
                      <span class="task-number">${i + 1}</span>
                      ${this.tasks[i]}
                    </div>
                    <div class="task-actions">
                      <button onclick="app.Edit(${i})" class="btn edit-btn">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button onclick="app.Delete(${i})" class="btn delete-btn">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>`;
        }
      } else {
        this.emptyState.style.display = 'block';
      }
      
      this.Count();
      this.tasksList.innerHTML = html;
    };
    
    this.Add = function() {
      const el = document.getElementById('add-todo');
      console.log("Add function triggered");
      const task = el.value.trim();
      
      if (task) {
        this.tasks.push(task);
        this.saveTasks();
        el.value = '';
        this.FetchAll();
      } else {
        console.log("No task entered");
      }
    };
    
    this.Edit = function(index) {
      console.log("Edit function triggered for index:", index);
      const el = document.getElementById('edit-todo');
      el.value = this.tasks[index];
      document.getElementById('edit-index').value = index;
      document.getElementById('edit-modal').style.display = 'flex';
    };
    
    this.SaveEdit = function() {
      console.log("SaveEdit function triggered");
      const el = document.getElementById('edit-todo');
      const task = el.value.trim();
      const index = parseInt(document.getElementById('edit-index').value);
      console.log("Editing task at index:", index, "New value:", task);
      
      if (task) {
        this.tasks[index] = task;
        this.saveTasks();
        this.FetchAll();
        closeModal();
      }
    };
    this.Delete = function (item) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to undo this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.tasks.splice(item, 1);
            this.saveTasks();
            this.FetchAll();
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
          }
        });
      };
      
    
    this.Count = function() {
      const counter = document.getElementById('counter');
      const count = this.tasks.length;
      
      if (count === 0) {
        counter.textContent = 'No Tasks';
      } else if (count === 1) {
        counter.textContent = '1 Task';
      } else {
        counter.textContent = count + ' Tasks';
      }
    };
  };
  
  function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
  }
  
  window.onclick = function(event) {
    if (event.target === document.getElementById('edit-modal')) {
      closeModal();
    }
  };
  
  document.addEventListener("DOMContentLoaded", function() {
    app.loadTasks();
    
    document.getElementById('add-form').addEventListener('submit', function(e) {
      e.preventDefault();
      app.Add();
    });
    
    document.getElementById('edit-form').addEventListener('submit', function(e) {
      e.preventDefault();
      app.SaveEdit();
    });
  });
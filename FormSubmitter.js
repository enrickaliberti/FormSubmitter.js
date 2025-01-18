//Enrick Aliberti
(function(global) {
    const FormSubmitter = function(formId, options = {}) {
        this.formId = formId;
        this.options = Object.assign({
            urlFormat: null, 
            submitMode: null, 
            method: null, 
            onSuccess: null, 
            onError: null 
        }, options);

        this.init();
    };

    FormSubmitter.prototype = {
        init: function() {
            const form = document.getElementById(this.formId);
            if (!form) {
                console.error("no form");
                return;
            }

            form.addEventListener('submit', (event) => this.handleSubmit(event, form));
        },

        handleSubmit: function(event, form) {
            event.preventDefault();

            let formData = this.collectFormData(form);
            let newAction = this.createActionUrl(formData, form);

            
            const method = this.options.method || form.method;

            
            this.options.submitMode = this.options.submitMode || "passive"

            if (this.options.submitMode === "passive") {
                form.setAttribute('action', newAction);
                form.method = method; 
                form.submit();
            } else if (this.options.submitMode === "active") {
                this.submitViaAjax(newAction, formData, method);
            } else {
                console.log("Method not implemented");
            }
        },

        collectFormData: function(form) {
            let formData = {};
            const inputs = form.querySelectorAll("[name]");

            inputs.forEach(input => {
                formData[input.name] = input.value;
            });

            return formData;
        },

        createActionUrl: function(formData, form) {
            let newAction = this.options.urlFormat || form.getAttribute('action');

            if (!newAction) {
                console.error("no action");
                return;
            }

            Object.keys(formData).forEach(key => {
                let sanitizedValue = this.sanitizeRouteParameter(formData[key]);
                newAction = newAction.replace(`{${key}}`, sanitizedValue);
            });

            return newAction;
        },

        sanitizeRouteParameter: function(value) {
            return value
                .toString() 
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9\s\-]/g, '')
                .replace(/\s+/g, '-') 
                .replace(/^-+|-+$/g, '') 
                .toLowerCase();  
        },

        submitViaAjax: function(newAction, formData, method) {
            const fetchOptions = {
                method: method.toUpperCase(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            if (method.toUpperCase() === 'POST') {
                fetchOptions.body = new URLSearchParams(formData).toString();
            } else if (method.toUpperCase() === 'GET') {
                newAction = `${newAction}?${new URLSearchParams(formData).toString()}`;
            }

            fetch(newAction, fetchOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('error req');
                    }
                    return response.text();
                })
                .then(responseText => {
                    if (this.options.onSuccess) {
                        this.options.onSuccess(responseText);
                    }
                })
                .catch(error => {
                    if (this.options.onError) {
                        this.options.onError(error);
                    } else {
                        console.log("error form");
                    }
                });
        }
    };

    global.FormSubmitter = FormSubmitter;
})(window);

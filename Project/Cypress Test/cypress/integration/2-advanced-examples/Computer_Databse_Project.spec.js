beforeEach(() => {
	cy.log('We will be on home page...!!!')
	cy.visit('https://computer-database.herokuapp.com/computers')
	cy.title().should('eq', 'Computers database')

})

Cypress.Commands.add('CompareTitle', () => {
	cy.title().should('eq', 'Computers database')


})

Cypress.Commands.add('AddComputer', (textToSearch) => {
	cy.get('#add').click()
	cy.title().should('eq', 'Computers database')
	cy.contains('Add a computer')

	cy.get('#name').clear()
	cy.get('#name').type(textToSearch)

	cy.get('#introduced').clear()
	cy.get('#introduced').type(Cypress.env('Valid_Introduced_Date'))

	cy.get('#discontinued').clear()
	cy.get('#discontinued').type(Cypress.env('Valid_Discontinued_Date'))

	cy.get('#company').select('IBM')
	cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > input.btn.primary:nth-child(1)').click()
	cy.contains('has been created')

	cy.SearchAddedComputer(Cypress.env('Add_Computer_Name'))


})



Cypress.Commands.add('SearchAddedComputer', (textToSearch) => {
	cy.get('#searchbox').clear()
	cy.get('#searchbox').type(textToSearch)
	cy.get('#searchsubmit').click()
	cy.get('body:nth-child(2) section:nth-child(2) > h1:nth-child(1)').invoke('text').then((text) => {
		// assert on the text
		if (text.includes('No computers found')) {
			// do your statements
			cy.log('Search Successful and No records found')

			return cy.log('Fail')
		} else {
			// do other statements
			if (text.includes('One computer found')) {

				cy.log('Search Successful and count is 1.')
			} else {
				cy.log('Multiple computers found')
				test2(text)
				cy.log('Multiple count=' + test2(text))
			}

			return cy.log('success')
		}
	})



});

//First Test
describe('Home page Navigation and Verify all components', () => {
	it('Verify home page title and verify all UI components on Home page', () => {
		cy.visit('https://computer-database.herokuapp.com/computers')
		cy.CompareTitle()

		cy.get("#searchbox")
			.should("have.value", "")

		cy.get("table.computers.zebra-striped:nth-child(3) thead:nth-child(1) tr:nth-child(1) th.col2.header.headerSortUp > a:nth-child(1)")
			.should('be.visible')

		cy.get("body:nth-child(2) header.topbar:nth-child(1) h1.fill > a:nth-child(1)")
			.should('be.visible')


		cy.get("table.computers.zebra-striped:nth-child(3) thead:nth-child(1) tr:nth-child(1) th.col3.header > a:nth-child(1)")
			.should('be.visible')


		cy.get("table.computers.zebra-striped:nth-child(3) thead:nth-child(1) tr:nth-child(1) th.col4.header > a:nth-child(1)")
			.should('be.visible')


		cy.get("table.computers.zebra-striped:nth-child(3) thead:nth-child(1) tr:nth-child(1) th.col5.header > a:nth-child(1)")
			.should('be.visible')

		cy.get("#add")
			.should('be.visible')

		cy.get("section:nth-child(2) div.pagination:nth-child(4) ul:nth-child(1) li.current > a:nth-child(1)")
			.should('be.visible')

		cy.get("section:nth-child(2) div.pagination:nth-child(4) ul:nth-child(1) li.prev.disabled > a:nth-child(1)")
			.should('be.visible')

		cy.get("section:nth-child(2) div.pagination:nth-child(4) ul:nth-child(1) li.next > a:nth-child(1)")
			.should('be.visible')

		cy.get("#searchsubmit")
			.should('be.visible')

		cy.get("#searchbox")
			.should('be.visible')

		cy.get("body:nth-child(2) section:nth-child(2) > table.computers.zebra-striped:nth-child(3)")
			.should('be.visible')

		//cy.get('section:nth-child(2) div.pagination:nth-child(4) ul:nth-child(1) li.prev.disabled > a:nth-child(1)')
			//.should('be.disabled')

		cy.get('section:nth-child(2) div.pagination:nth-child(4) ul:nth-child(1) li.next > a:nth-child(1)')
			.should('not.be.disabled')

		cy.get('section:nth-child(2) div.pagination:nth-child(4) ul:nth-child(1) li.current > a:nth-child(1)').invoke('text').then((text) => {
			cy.log('Total Count=' + test(text))
			cy.log(test1(text))

		
		
		
	






	});
});

});

function test(words) {
	var n = words.split(" ");
	return n[n.length - 1];

}

function test2(words) {
	var n = words.split(" ");
	return n[0];

}


function test1(words) {
	var n = words.slice(0, 21);
	return n;

}




//Second Test
describe('Search Textbox functionality', () => {
	it('Search for key - verify message for invalid search', () => {
		cy.SearchAddedComputer(Cypress.env('Invalid_Search_Key'))
	});
});

//Third Test
describe('Search Textbox functionality', () => {
	it('Search for key - verify message for Valid and invalid search', () => {
		cy.SearchAddedComputer(Cypress.env('Valid_Search_Key'))
	});
});

//Forth Test
describe('Verify UI components on Add Computer Page', () => {
	it('Verify UI components on Add Computer Page', () => {
		cy.get('#add').click()
		cy.title().should('eq', 'Computers database')
		cy.contains('Add a computer')

		cy.get("#name")
			.should("have.value", "")

		cy.get("#introduced")
			.should("have.value", "")

		cy.get("#discontinued")
			.should("have.value", "")

		cy.get("#company")
			.should("have.value", "")

		cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > input.btn.primary:nth-child(1)')
			.should('not.be.disabled')

		cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > a.btn:nth-child(2)')
			.should('not.be.disabled')

		cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > a.btn:nth-child(2)').click()



	});
});

//Fifth Test
describe('Verify UI components on Edit Computer Page', () => {
			it('Verify UI components on Edit Computer Page', () => {

				cy.AddComputer(Cypress.env('Add_Computer_Name2'))
				cy.log('Added successfully.')
					//Search Added Computer
				cy.SearchAddedComputer(Cypress.env('Add_Computer_Name2'))

				cy.get('body:nth-child(2) section:nth-child(2) > h1:nth-child(1)').invoke('text').then((text) => {
					// assert on the text
					if (text.includes('No computers found')) {
						// do your statements
						cy.log('Search Success')


					} else {
						// do other statements
						cy.log('Search Fail')

						//Click on the Added Computer
						cy.contains(Cypress.env('Add_Computer_Name2')).click()

						//Verify Page 
						cy.contains('Edit')



						cy.get("#name")
							.should('be.visible')

						cy.get("#introduced")
							.should('be.visible')

						cy.get("#discontinued")
							.should('be.visible')

						cy.get("#company")
							.should('be.visible')

						cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > input.btn.primary:nth-child(1)')
							.should('not.be.disabled')

						cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > a.btn:nth-child(2)')
							.should('not.be.disabled')

						cy.get('body:nth-child(2) section:nth-child(2) form.topRight:nth-child(3) > input.btn.danger')
							.should('not.be.disabled')

						cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > a.btn:nth-child(2)').click()
					}



				});
			});
			
});



			//Sixth Test
			describe('Add Computer', () => {
				it('Add computer Successful', () => {
					cy.get('#add').click()
					cy.title().should('eq', 'Computers database')
					cy.contains('Add a computer')

					cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > input.btn.primary:nth-child(1)').click()
					cy.get('#name').should('have.css', 'border-bottom-color', 'rgb(200, 120, 114)')


					cy.log('Blank Fields are verified')
					cy.get('#name').clear()

					cy.get('#name').clear()
					cy.get('#name').type(Cypress.env('Add_Computer_Name'))

					cy.get('#introduced').clear()
					cy.get('#introduced').type(Cypress.env('Valid_Introduced_Date'))

					cy.get('#discontinued').clear()
					cy.get('#discontinued').type(Cypress.env('Valid_Discontinued_Date'))

					cy.get('#company').select('IBM')
					cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > input.btn.primary:nth-child(1)').click()
					cy.contains('has been created')

					cy.SearchAddedComputer(Cypress.env('Add_Computer_Name'))
				});
			});




			//Seventh Test
			describe('Verify Mandatory field error on Add Computer', () => {
				it('Red mark for mandatory fields verification', () => {
					cy.get('#add').click()
					cy.title().should('eq', 'Computers database')
					cy.contains('Add a computer')


					cy.get('#introduced').clear()
					cy.get('#introduced').type(Cypress.env('Invalid_Introduced_Date'))

					cy.get('#discontinued').clear()
					cy.get('#discontinued').type(Cypress.env('Invalid_Discontinued_Date'))

					cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > input.btn.primary:nth-child(1)').click()

					cy.get('#name').should('have.css', 'border-bottom-color', 'rgb(200, 120, 114)')
					cy.get('#introduced').should('have.css', 'border-bottom-color', 'rgb(200, 120, 114)')
					cy.get('#discontinued').should('have.css', 'border-bottom-color', 'rgb(200, 120, 114)')

					cy.log('Mandatory Fields are verified')
				});
			});


			//Eigth Test
			describe('Verify Cancel button', () => {
				it('Cancel button click should navigate back to home page', () => {
					cy.get('#add').click()
					cy.contains('Add a computer')
					cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > a.btn:nth-child(2)').click()
					cy.title().should('eq', 'Computers database')
					cy.contains('Computer name')

				});
			});


			//Ninth Test
			describe('Search and navigate to Edit Computer', () => {
				it('Search and navihate to edit computer', () => {

					cy.AddComputer(Cypress.env('Add_Computer_Name1'))
						//Search Added Computer
					cy.SearchAddedComputer(Cypress.env('Add_Computer_Name1'))

					cy.get('body:nth-child(2) section:nth-child(2) > h1:nth-child(1)').invoke('text').then((text) => {
						// assert on the text
						if (text.includes('No computers found')) {
							// do your statements
							cy.log('Search Success')


						} else {
							// do other statements
							cy.log('Search Fail')

							//Click on the Added Computer
							cy.contains(Cypress.env('Add_Computer_Name1')).click()

							//Verify Page 
							cy.contains('Edit')

							//Edit Computer Name
							cy.get('#name').clear()
							cy.get('#name').type(Cypress.env('Add_Computer_Name1') + 'EDIT')

							//Edit Introduced date
							cy.get('#introduced').clear()
							cy.get('#introduced').type(Cypress.env('Valid_Introduced_Date_ForEdit'))

							//Edit discontinued date 
							cy.get('#discontinued').clear()
							cy.get('#discontinued').type(Cypress.env('Valid_Discontinued_Date_ForEdit'))


							cy.get('#company').select('RCA')

							//Verify Edited entry by click on the update button
							cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > input.btn.primary:nth-child(1)').click()

							//Verify Success message 
							cy.contains('has been updated')

							//Search Added Entry
							cy.SearchAddedComputer('Add_Computer_Name1')

							if (cy.contains('computers found') == true) {
								cy.log('Success..')
							}

							cy.log('Edit Computers verified successfully')
						}
					})







				});
			});


			//Tenth Test
			describe('Search and Delete entry', () => {
				it('Search and Delete Entry', () => {
					cy.AddComputer(Cypress.env('Add_Computer_Name_ForDelete'))
						//Search Added Computer
					const rep = cy.SearchAddedComputer(Cypress.env('Add_Computer_Name_ForDelete'))

					cy.log(rep)

					if (rep == 'Success') {



						//Click on the Added Computer
						cy.contains(Cypress.env('Add_Computer_Name_ForDelete')).click()

						//Verify Page 
						cy.contains('Edit')

						//Delete Computer Name
						cy.get('body:nth-child(2) section:nth-child(2) form.topRight:nth-child(3) > input.btn.danger').click()

						//Verify Success message 
						cy.contains('has been deleted')


						cy.log('Delete Computers verified successfully')
					} else {
						cy.log('NO RECORD FOUND')

					}


				});
			});


			//Eleventh Test
			describe('Search and Edit and invalid update', () => {
				it('Verify invalid update', () => {
					cy.AddComputer(Cypress.env('Add_Computer_Name_ForInvalidDelete'))
						//Search Added Computer
					cy.SearchAddedComputer(Cypress.env('Add_Computer_Name_ForInvalidDelete'))

					//Search Added Computer
					const rep = cy.SearchAddedComputer(Cypress.env('Add_Computer_Name_ForInvalidDelete'))

					cy.log(rep)

					if (rep == 'Success') {

						//Click on the Added Computer
						cy.contains(Cypress.env('Add_Computer_Name_ForInvalidDelete')).click()

						//Verify Page 
						cy.contains('Edit')

						//Blank Computer Name

						cy.get('#name').clear()
						cy.get('#name').type(' ')

						cy.get('#introduced').clear()
						cy.get('#introduced').type(Cypress.env('Invalid_Introduced_Date'))

						cy.get('#discontinued').clear()
						cy.get('#discontinued').type(Cypress.env('Invalid_Discontinued_Date'))

						//Click on the Save button
						cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > input.btn.primary:nth-child(1)').click()

						//Verify Colors
						cy.get('#name').should('have.css', 'border-bottom-color', 'rgb(200, 120, 114)')

						cy.get('#introduced').should('have.css', 'border-bottom-color', 'rgb(200, 120, 114)')

						cy.get('#discontinued').should('have.css', 'border-bottom-color', 'rgb(200, 120, 114)')




						cy.log('Mandatory Fields are verified')




						cy.log('Update invalid entry verified successfully')
					} else {
						cy.log('NO RECORD FOUND')

					}


				});
			});


			//Twelth Test
			describe('Search and Edit and invalid update', () => {
				it('Verify invalid update', () => {
					cy.AddComputer(Cypress.env('Add_Computer_Name_ForInvalidCancel'))
						//Search Added Computer
					cy.SearchAddedComputer(Cypress.env('Add_Computer_Name_ForInvalidCancel'))

					//Search Added Computer
					const rep = cy.SearchAddedComputer(Cypress.env('Add_Computer_Name_ForInvalidCancel'))

					cy.log(rep)

					if (rep == 'Success') {

						//Click on the Added Computer
						cy.contains(Cypress.env('Add_Computer_Name_ForInvalidCancel')).click()

						//Verify Page 
						cy.contains('Edit')

						//Click on the Cancel button
						cy.get('body:nth-child(2) section:nth-child(2) form:nth-child(2) div.actions:nth-child(2) > a.btn:nth-child(2)').click()

						//Verify Page Navigation
						cy.CompareTitle()




						cy.log('Cancel on update page is verified')




						cy.log('Page navigation on update page and verified successfully')

					} else {
						cy.log('NO RECORD FOUND')

					}

				});
			});

			//Thirteenth Test
			describe('Verify All UI Components', () => {
				it('Verify all UI components', () => {

					//Verify Page Navigation
					cy.CompareTitle()

					//
					cy.get("#searchbox")
						.should("have.value", "")

					cy.get("table.computers.zebra-striped:nth-child(3) thead:nth-child(1) tr:nth-child(1) th.col2.header.headerSortUp > a:nth-child(1)")
						.should('be.visible')

					cy.get("body:nth-child(2) header.topbar:nth-child(1) h1.fill > a:nth-child(1)")
						.should('be.visible')


					cy.get("table.computers.zebra-striped:nth-child(3) thead:nth-child(1) tr:nth-child(1) th.col3.header > a:nth-child(1)")
						.should('be.visible')


					cy.get("table.computers.zebra-striped:nth-child(3) thead:nth-child(1) tr:nth-child(1) th.col4.header > a:nth-child(1)")
						.should('be.visible')


					cy.get("table.computers.zebra-striped:nth-child(3) thead:nth-child(1) tr:nth-child(1) th.col5.header > a:nth-child(1)")
						.should('be.visible')

					cy.get("#add")
						.should('be.visible')

					cy.get("section:nth-child(2) div.pagination:nth-child(4) ul:nth-child(1) li.current > a:nth-child(1)")
						.should('be.visible')

					cy.get("section:nth-child(2) div.pagination:nth-child(4) ul:nth-child(1) li.prev.disabled > a:nth-child(1)")
						.should('be.visible')

					cy.get("section:nth-child(2) div.pagination:nth-child(4) ul:nth-child(1) li.next > a:nth-child(1)")
						.should('be.visible')

					cy.get("#searchsubmit")
						.should('be.visible')

					cy.get("#searchbox")
						.should('be.visible')

					cy.get("body:nth-child(2) section:nth-child(2) > table.computers.zebra-striped:nth-child(3)")
						.should('be.visible')



				});
			});
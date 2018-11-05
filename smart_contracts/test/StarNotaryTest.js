const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => {

	const name = 'Star power 101!';
	const story = 'Virender\'s Awesome star';
	const ra = 'ra_030.155';
	const dec = 'dec_121.874';
	const mag = 'mag_245.978';
	const tokenId = 1;

	let defaultAccount = accounts[0];
	let account1 = accounts[1];
	let account2 = accounts[2];
	let starPrice = web3.toWei(1, "ether");

	beforeEach(async function() {
		this.contract = await StarNotary.new({from: defaultAccount})
	})


	describe('can create a star', () => {
		it('can create a star and get its name', async function () {

			console.log(`Account: ${accounts[0]}`);
			await this.contract.createStar(name, story, ra, dec, mag, {from: defaultAccount});

			it('can create a star and get its data', async function() {
				assert.deepEqual(await this.contract.tokenIdToStarInfo(tokenId), [name, story, ra, dec, mag]);
			});
		});
	});

	describe("Check if the user is rightful owner of the star", () => {
		it('Star has a rightful owner', async function() {
			await this.contract.createStar(name, story, ra, dec, mag, {from: defaultAccount})
			const owner = await this.contract.ownerOf(1, {from: defaultAccount})

			assert.equal(owner, defaultAccount)
		})
	});

	describe('Selling and Buying stars', () => {

		let starPrice = web3.toWei(1, "ether");

		it('user can put up their star for sale', async function () {
			await this.contract.createStar(name, story, ra, dec, mag, {from: defaultAccount});
			assert.equal(await this.contract.ownerOf(tokenId), defaultAccount);
			await this.contract.putStarUpForSale(tokenId, starPrice, {from: defaultAccount});

			assert.equal(await this.contract.starsForSale(tokenId), starPrice);

			await this.contract.buyStar(tokenId, {from: account1, value: starPrice, gasPrice: 0});
			assert.equal(await this.contract.ownerOf(tokenId), account1);

		});
	});

	describe('Check for star existence', () => {
		it('star already exist', async function() {
			await this.contract.createStar(name, story, ra, dec, mag, {from: defaultAccount});

			assert.equal(await this.contract.checkIfStarExist(ra, dec, mag), true);
		});
	});

	describe('Overpaid amount is returned to user', () => {

		const overpaidAmount = web3.toWei(1.5, 'ether');

		it('Overpaid amount is returned to user', async function () {
			await this.contract.createStar(name, story, ra, dec, mag, {from: defaultAccount});
			assert.equal(await this.contract.ownerOf(tokenId), defaultAccount);
			await this.contract.putStarUpForSale(tokenId, starPrice, {from: defaultAccount});

			assert.equal(await this.contract.starsForSale(tokenId), starPrice);

			const balanceBeforeTransaction = web3.eth.getBalance(account1);

			await this.contract.buyStar(tokenId, {from: account1, value: starPrice, gasPrice: 0});
			assert.equal(await this.contract.ownerOf(tokenId), account1);

			const balanceAfterTransaction = web3.eth.getBalance(account1);
			assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice);
		});
	});

	/* Mint star token test */
	describe('Star mint test', () => {
		let transaction;

		beforeEach(async function() {
			transaction = await this.contract.mint(tokenId, {from: defaultAccount});
		});

		it('minted star belong to the right owner', async function () {
			var owner = await this.contract.ownerOf(tokenId, {from: defaultAccount});
			assert.equal(owner, defaultAccount);
		});
	});

	/* Set another address to approve transfer of the given token ID and get the appoved address for token ID */
	describe('Approval test', () =>{
		const to = accounts[1];
		const tokenId = 1;

		it('Set and get approved address for a token ID', async function() {
			await this.contract.createStar(name, story, ra, dec, mag, {from: defaultAccount});
			const transaction = await this.contract.approve(to, tokenId, {from: defaultAccount});

			assert.equal(await this.contract.getApproved(tokenId, {from: defaultAccount}), to);
		});
	});

	/* Sets or unsets the approval of a given operator test */
	describe('Set approval for all test', () => {
		const approved = true;
		const to = accounts[1];

		it('Sets or unsets the approval of a given operator', async function() {
			await this.contract.createStar(name, story, ra, dec, mag, {from: defaultAccount});
			await this.contract.setApprovalForAll(to, tokenId);

			assert.equal(await this.contract.isApprovedForAll(defaultAccount, to, {from: defaultAccount}), approved);
		});
	});

	/* Test Safely transfers the ownership of a given token ID to another address */
	describe('safeTransferFrom test', () => {
		const to = accounts[1];

		beforeEach(async function() {
			await this.contract.createStar(name, story, ra, dec, mag, {from: defaultAccount});
			await this.contract.safeTransferFrom(defaultAccount, to, tokenId);
		});

		/* ownerOf Test */
		it('is the owner of the token', async function() {
			assert.equal(await this.contract.ownerOf(tokenId, {from: defaultAccount}), to);
		});

		/* ownerOf Test */
		it('is not the owner of the token', async function() {
			assert.notEqual(await this.contract.ownerOf(tokenId, {from: defaultAccount}), defaultAccount);
		});

		/* ownerOf Test */
		it('is the owner of the token', async function() {
			assert.equal(await this.contract.ownerOf(tokenId, {from: to}), to);
		});
	});

	/*  Testing following
		1. Create Two stars
		2. Check the owners of the both the stars
		3. Put up both the stars for sale
		4. Get all the stars for sale. Lenght of the array should be 2
		5. Buy one (tokenID: 1) star from different account.
		6. Get all the stars for sale. Length of the array sould be 1
	*/
	describe("Get all stars for sale", () => {

		it('Get all stars for sale with there price', async function () {
			await this.contract.createStar("101", "101", "101", "101", "101", {from: defaultAccount});
			assert.equal(await this.contract.ownerOf(tokenId), defaultAccount);

			await this.contract.createStar("102", "102", "102", "102", "102", {from: defaultAccount});
			assert.equal(await this.contract.ownerOf(tokenId), defaultAccount);

			await this.contract.putStarUpForSale(1, starPrice, {from: defaultAccount});
			await this.contract.putStarUpForSale(2, starPrice, {from: defaultAccount});

			assert.equal(await this.contract.starsForSale(1), starPrice);
			assert.equal(await this.contract.starsForSale(2), starPrice);

			var [tokens, prices] = await this.contract.getStarsForSale();

			assert.equal(await tokens.length, 2);
			assert.equal(await prices.length, 2);

			await this.contract.buyStar(1, {from: account1, value: starPrice, gasPrice: 0});
			assert.equal(await this.contract.ownerOf(1), account1);

			[tokens, prices] = await this.contract.getStarsForSale();

			assert.equal(await tokens.length, 1);
			assert.equal(await prices.length, 1);
		});
	});
});

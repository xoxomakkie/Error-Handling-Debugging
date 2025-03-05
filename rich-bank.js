const accounts = [
	{id: 1, owner: "Alice", balance: 500},
	{id: 2, owner: "Bob", balance: 300}
];

function getAccountById (id)
{
	for (const account of accounts)
	{
		if (account.id === id)
		{
			return account;
		}
	}

	return undefined; // Returns undefined if no account is found
}

function createAccount(newAccountId, newAccountOwner) {
    if (!Number.isInteger(newAccountId) || newAccountId <= 0) {
        throw new Error("Invalid account ID: It must be a positive integer.");
    }

    if (typeof newAccountOwner !== "string" || newAccountOwner.trim().length === 0) {
        throw new Error("Invalid account owner: The owner must be a non-empty string.");
    }

    if (accounts.some(account => account.id === newAccountId)) {
        throw new Error("Account ID already exists.");
    }

    accounts.push({
        id: newAccountId,
        owner: newAccountOwner.trim(),
        balance: 0 // Fix: Use a number instead of a string
    });
}

function depositMoney(accountId, amount) {
    const account = getAccountById(accountId);

    if (!account) {
        throw new Error("Account not found.");
    }

    if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
        throw new Error("Invalid deposit amount: It must be a positive finite number.");
    }

    account.balance += amount; // Ensure balance updates correctly
}

function withdrawMoney(accountId, amount) {
    const account = getAccountById(accountId);

    if (!account) {
        throw new Error("Account not found.");
    }

    if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
        throw new Error("Invalid withdrawal amount: It must be a positive finite number.");
    }

    if (account.balance < amount) {
        throw new Error("Insufficient funds.");
    }

    account.balance -= amount;
}


function transferMoney(fromAccountId, toAccountId, amount) {
    const fromAccount = getAccountById(fromAccountId);
    const toAccount = getAccountById(toAccountId);

    if (!fromAccount) {
        throw new Error("Source account not found.");
    }

    if (!toAccount) {
        throw new Error("Destination account not found.");
    }

    if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
        throw new Error("Invalid transfer amount: It must be a positive finite number.");
    }

    if (fromAccount.balance < amount) {
        throw new Error("Insufficient funds for transfer.");
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;
}


/*
Hints:

getAccountById("1");

createAccount(1, "Alice");
createAccount("3", "Charlie");
createAccount(-3, "Charlie");
createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");

depositMoney(1, "300")
depositMoney(1, -300)
depositMoney(1, 0)
depositMoney(1, Infinity)
depositMoney(4, 100)

withdrawMoney(1, -100)
withdrawMoney(1, 0)
withdrawMoney(1, 501)

transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);
*/

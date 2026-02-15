Bug 1 — Login fields not found on buggy site

Severity: High

Steps

1) Open the buggy site.

2) Go to /auth/login.

3) Try to use the login page.

Expected

Email and password fields should be visible and usable.

Actual

Login fields are missing or not rendered with the selectors used on the normal site, so login-related tests fail.

Notes

This impacts login, order history and checkout scenarios because they depend on authentication.

Bug 2 — Guest checkout option missing

Severity: High

Steps

1) Add a product to the cart.

2) Go to checkout.

3) Try to continue as guest.

Expected

Guest checkout option should be available.

Actual

Guest checkout tab/button is not visible, so the checkout flow cannot continue.

Bug 3 — No confirmation when cart becomes empty

Severity: Medium

Steps

1) Add a product to cart.

2) Open cart.

3) Remove the item.

Expected

User should see a clear “cart is empty” message.

Actual

No empty-cart confirmation appears, so it’s unclear if the action succeeded.

Bug 4 — Header shows “User Data not found” after login

Severity: Medium

Steps

1) Login using valid credentials.

2) Open account pages (profile/invoices).

3) Check the user dropdown in the header.

Expected

Header should show the logged-in user/account name.

Actual

Header shows “User Data not found” even though account data is clearly loaded.

Notes

Confusing UX — user appears logged in but header suggests missing data.

Bug 5 — Typo in navigation label

Severity: Low

Steps

View top navigation.

Expected

Menu item should read Contact.

Actual

Label is shown as Contakt.

Bug 6 — Placeholder text shown as real profile data

Severity: Low / Medium

Steps

1) Login.

2) Open Profile page.

3) Look at the City field.

Expected

City should contain valid data or be empty.

Actual

Field shows “City not found”, which looks like placeholder/error text displayed to the user.

Bug 7 — Buggy site differs heavily from normal site

Severity: Medium

Steps

1) Run the same automated tests against:

2) normal site

3) buggy site

Expected

Main structure should stay similar with only intentional defects.

Actual

Several key elements differ or disappear (login fields, checkout flow, messages), causing major test failures.

Notes

Looks like core UI structure changes between environments rather than just isolated bugs.
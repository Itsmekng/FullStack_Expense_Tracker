const forgetEmailForm = (id) => {
    return template = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">

                            <title>Reset Password - Expense Tracker</title>

                            <!-- Bootstrap CSS -->
                            <link
                                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                                rel="stylesheet"
                            >
                        </head>
                        <body class="bg-light">
                            <div class="container min-vh-100 d-flex justify-content-center align-items-center">
                                <div class="card shadow-sm border-0 rounded-4" style="max-width: 420px; width: 100%;">
                                    <div class="card-body p-4 p-md-5">

                                        <!-- Header -->
                                        <div class="text-center mb-4">
                                            <h3 class="fw-bold mb-2">
                                                Reset Password
                                            </h3>
                                            <p class="text-secondary mb-0">
                                                Enter your new password below.
                                            </p>
                                        </div>

                                        <!-- Form -->
                                        <form
                                            action="http://localhost:3000/api/password/newpassword"
                                            method="POST"
                                        >
                                            <!-- Hidden id -->
                                            <input
                                                type="hidden"
                                                name="id"
                                                value="${id}"
                                            >
                                            <!-- New Password -->
                                            <div class="mb-3">
                                                <label
                                                    for="newPassword"
                                                    class="form-label fw-semibold"
                                                >
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    class="form-control form-control-lg"
                                                    id="newPassword"
                                                    name="new_Password"
                                                    placeholder="Enter new password"
                                                    minlength="6"
                                                    required
                                                >
                                            </div>
                                            <!-- Submit -->
                                            <button
                                                type="submit"
                                                class="btn btn-success btn-lg w-100"
                                            >
                                                Reset Password
                                            </button>
                                        </form>

                                        <!-- Footer -->
                                        <p class="text-center text-secondary small mt-4 mb-0">
                                            Expense Tracker
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </body>
                        </html>                 
                        `
}

module.exports = forgetEmailForm;
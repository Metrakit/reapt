import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import cn from "classnames";
import isEmail from "validator/lib/isEmail";

import "./ForgottenPassword.styl";
import { PAGE_HOME } from "../../../../../constants/router";
import { sendEmail as resetPasswordSendEmail } from "../../actions";
import { configAskPassword } from "../../config";
import InputGroup from "../../../../components/default/InputGroup/InputGroup";

const mapStateToProps = state => ({
    actionMessage: state.userPassword.askPassword.message,
    actionError: state.userPassword.askPassword.error
});

const mapDispatchToProps = dispatch => ({
    resetPasswordSendEmail: email => dispatch(resetPasswordSendEmail(email))
});

class ForgottenPassword extends PureComponent {
    static propTypes = {
        resetPasswordSendEmail: PropTypes.func.isRequired,
        actionMessage: PropTypes.string.isRequired,
        actionError: PropTypes.bool.isRequired
    };

    state = {
        hasError: false,
        errorField: null,
        errorMessage: ""
    };

    inputAskResetPassword = null;

    handleSubmit(e) {
        e.preventDefault();
        const { resetPasswordSendEmail } = this.props;
        const email = this.inputAskResetPassword.input;

        if (email !== null) {
            let hasError = false;
            let errorField = null;
            let errorMessage = null;

            const value = email.value.trim();

            if (value.length === 0) {
                hasError = true;
                errorField = "Email";
                errorMessage = "errors.emptyField";
            } else if (!isEmail(value)) {
                hasError = true;
                errorField = "Email";
                errorMessage = "errors.invalidEmail";
            } else {
                resetPasswordSendEmail(value);
            }

            this.setState({
                hasError,
                errorField,
                errorMessage
            });
        }
    }

    render() {
        const { hasError, errorField, errorMessage } = this.state;
        const { actionMessage, actionError } = this.props;
        return (
            <form
                className="forgotten-password"
                onSubmit={this.handleSubmit.bind(this)}
            >
                <InputGroup
                    ref={ref => {
                        this.inputAskResetPassword = ref;
                    }}
                    name="email"
                    label={configAskPassword.inputLib}
                    errorField={errorField}
                />

                <Link to={PAGE_HOME}>
                    <div className="home-link">Revenir à l&apos;accueil</div>
                </Link>

                <div className="error-message">
                    {hasError ? (
                        <Trans
                            i18nKey={errorMessage}
                            values={{ field: errorField }}
                        />
                    ) : null}
                </div>

                <button className="btn" type="submit">
                    Envoyer
                </button>

                <div
                    className={cn("action-message", { hasError: actionError })}
                >
                    {actionMessage}
                </div>
            </form>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgottenPassword);

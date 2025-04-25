import gql from 'graphql-tag.macro'
import React, { useMemo } from 'react'
import { Query, graphql, withApollo } from 'react-apollo'
import { Container, PopoverBody, PopoverHeader, Spinner, UncontrolledPopover } from "reactstrap"
import { Input, Button } from "helpers/reactstrap"
import SubscriptionHelper from 'helpers/subscriptionHelper'
import "./style.scss"
const EdVenturesAppLogoQuery = gql`
    query EdVenturesAppLogo {
        getFirebaseLogoSrc
    }
`

const EdVenturesAppWebsiteQRCodeQuery = gql`
    query EdVenturesAppWebsiteQRCode {
        getFirebaseWebsiteQRCode
    }
`

const EdVenturesAppTextQuery = gql`
    query EdVenturesAppText {
        getFirebasePageText {
            Awards
            Heading
            Subheading
            EmailHeading
            EmailNotFound
        }
    }
`

const EdVenturesAppQuery = gql`
    query EdVenturesApp {
        getCurrentFirebaseSelections {
            Mission
            Simulator
            StationEmailLinks {
                station
                email
            }
            Awards {
                id
                Name
                ClassHours
                FlightHours
                Description
                ImageURL
            }
            EventId
            flightSubmissions
        }
    }
`

const EdVenturesAppSubscriptions = gql`
    subscription EdVenturesAppSubscriptions {
        firebaseCurrentSelectionsUpdate {
            Mission
            Simulator
            StationEmailLinks {
                station
                email
            }
            Awards {
                id
                Name
                ClassHours
                FlightHours
                Description
                ImageURL
            }
            EventId
            flightSubmissions
        }
    }

`

const querySelectorProofString = (str: string) => {
    return str.replaceAll(/([!"#$%&'()* +,./:;<=>?@[\\\]^`{|}~])/g, '')
}

function isValidEmail(email: string) {
    // Regular expression for validating an email address
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Test the email against the regex
    return emailRegex.test(email);
}

const EdVenturesAppComp: React.FC<any> = (props) => {
    const [checkingUserAccount, setCheckingUserAccount] = React.useState(false);
    const [locked, setLocked] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const [showError, setShowError] = React.useState(false);

    const validEmail = useMemo(() => {
        return isValidEmail(email);
    }, [email])

    const onCheckClick = async () => {
        if (!validEmail) {
            setShowError(true);
            return;
        }
        setCheckingUserAccount(true);
        const firebaseUserExists = await props.client.query({
            query: gql`
                query getFirebaseUser($id: ID!) {
                    getFirebaseUser(id: $id)
                }
            `,
            variables: { id: email }
        });
        if (!firebaseUserExists.data.getFirebaseUser) {
            // Create the user
            await props.client.mutate({
                mutation: gql`
                    mutation createFirebaseUser($id: ID!) {
                        createFirebaseUser(id: $id)
                    }
                `,
                variables: { id: email }
            });

        }
        // Set the user's station
        const station = props.station.name;
        await props.client.mutate({
            mutation: gql`
                mutation updateFirebaseUserStation($email: String!, $station: String!) {
                    updateFirebaseUserStation(email: $email, station: $station)
                }
            `,
            variables: { email, station }
        });
        setLocked(true);
        setCheckingUserAccount(false)
    };

    const { assets } = props.simulator;
    const { getCurrentFirebaseSelections } = props.data;
    if (getCurrentFirebaseSelections?.flightSubmissions?.includes(props.flight.id)) {
        return <div />
    }
    return <Query query={EdVenturesAppTextQuery}>
        {({ loading, data }: any) => {
            if (loading) {
                return <div></div>
            }
            else if (!getCurrentFirebaseSelections || !data) {
                return <div>No data</div>
            }
            const { Awards, EmailHeading, Heading, Subheading } = data.getFirebasePageText
            return <Container fluid className="card-edVentureApp">
                <SubscriptionHelper
                    subscribe={() =>
                        props.data.subscribeToMore({
                            document: EdVenturesAppSubscriptions,
                            updateQuery: (previousResult: any, { subscriptionData }: any) => {
                                if (!subscriptionData.data) return previousResult;
                                return Object.assign({}, previousResult, {
                                    getCurrentFirebaseSelections: subscriptionData.data.firebaseCurrentSelectionsUpdate
                                });
                            }
                        })
                    } />
                <div className='data-left-parent'>
                    <div className='logos-area'>
                        <Query query={EdVenturesAppLogoQuery}>
                            {({ loading, data }: any) => {
                                if (loading) {
                                    return <div></div>
                                }
                                return <img draggable={false} src={data.getFirebaseLogoSrc} height={'100%'} alt='eva logo' />
                            }}
                        </Query>
                        <Query query={EdVenturesAppWebsiteQRCodeQuery}>
                            {({ loading, data }: any) => {
                                if (loading) {
                                    return <div></div>
                                }
                                return <img draggable={false} src={data.getFirebaseWebsiteQRCode} height={'100%'} alt='eva logo' />
                            }}
                        </Query>
                        <div className="ShipLogo">
                            <img draggable={false} src={`/assets/${assets.logo}`} height={'100%'} alt='simulator logo' />
                        </div>
                    </div>
                    <div className='left-text-area'>
                        <div>
                            <h2 className='heading-text-area'>{Heading}</h2>
                        </div>
                        <h1 className='event-id-text'>{getCurrentFirebaseSelections.EventId}</h1>
                        <h6>
                            {Subheading}
                        </h6>
                    </div>

                </div>
                <div className='right-text-area'>
                    {getCurrentFirebaseSelections.Awards.length > 0 && <div className='awards-parent'>
                        <h3>{Awards}</h3>
                        <div className='awards-group-parent'>
                            {getCurrentFirebaseSelections.Awards.map((award: any) => {
                                return <React.Fragment>
                                    <div className='awards-group' id={querySelectorProofString(award.id)}>
                                        <img draggable={false} className='awards-image' src={award.ImageURL} alt='award logo' />
                                        <div>{award.Name}</div>
                                    </div>
                                    <UncontrolledPopover trigger="legacy" placement="top" target={querySelectorProofString(award.id)}>
                                        <PopoverHeader>{award.Name}</PopoverHeader>
                                        <PopoverBody>
                                            <div className='popover-body-parent' >
                                                {award.Description}
                                                <hr />
                                                <div>{`Additional Class hours: ${award.ClassHours}`}</div>
                                                <div>{`Additional Flight hours: ${award.FlightHours}`}</div>
                                            </div>
                                        </PopoverBody>
                                    </UncontrolledPopover>
                                </React.Fragment>
                            })}
                        </div>

                    </div>}
                    <div>
                        <div className='email-heading-parent'>
                            <div className='email-heading-text'>{EmailHeading}</div>
                        </div>

                        <div className='input-parent'>
                            <div className='text-input'>
                                {locked && <div className='locked-email'>{email}</div>}
                                {!locked && <Input onChange={(e) => setEmail(e.target.value)} value={email} disabled={locked} className='reactstrap-input' type='email' placeholder='Enter your email address' />}
                                {showError && !validEmail && <div className='invalid-email'>Invalid email address</div>}
                            </div>
                            <Button className="email-btn" onMouseDown={() => {
                                if (locked) {
                                    setLocked(false);
                                }
                                else {
                                    onCheckClick();
                                }

                            }}>{locked ? "Change email" : "Link email"}</Button>
                            {checkingUserAccount && <div><Spinner /></div>}
                        </div>

                    </div>


                </div>

            </Container>
        }}
    </Query>


}


export default graphql(EdVenturesAppQuery, {
    options: (props: any) => ({
        fetchPolicy: 'cache-and-network',
    })
})(withApollo(EdVenturesAppComp));
import {render} from '@testing-library/react'
import * as React from 'react'
import {graphql, RelayEnvironmentProvider, useLazyLoadQuery} from 'react-relay'
import {createMockEnvironment, MockPayloadGenerator} from 'relay-test-utils'
function Example() {
    const {user} = useLazyLoadQuery(
        graphql`
            query testFirstQuery {
                user {
                    name
                }
            }
        `,
        {},
    )
    useLazyLoadQuery(
        graphql`
            query testSecondQuery {
                user {
                    group {
                        id
                    }
                }
            }
        `,
        {},
    )
    console.log({user})
    return `User name: ${user.name}`
}

test('test', () => {
    const environment = createMockEnvironment()
    const queueResolver = () =>
        environment.mock.queueOperationResolver(operation =>
            MockPayloadGenerator.generate(operation),
        )
    queueResolver()
    queueResolver()
    render(
        <RelayEnvironmentProvider environment={environment}>
            <Example />
        </RelayEnvironmentProvider>
    )
    console.log(document.body.innerHTML)
})

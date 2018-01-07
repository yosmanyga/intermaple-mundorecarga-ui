import React from "react";
import PropTypes from "prop-types";
import {Container, Error, Flag, Image, Input, Platform, Text} from "@yosmy/ui";
import Subtitle from "../Common/Subtitle";
import arrow from "./arrow.png";
import logo from "./logo_v.png";

class ListCountriesBlock extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        countries: PropTypes.array,
        fav: PropTypes.bool, // Show favorite list?
        onSelect: PropTypes.func.isRequired, // (country)
    };

    state = {
        progress: 0,
        filter: ""
    };

    render() {
        const countries = this.props.countries
            .map((country) => {
                const {name} = country;

                if (
                    this.state.filter
                    && !this._match(name, this.state.filter)
                ) {
                    return null;
                }

                return this._renderCountry(country);
            })
            .filter(x => x);

        return <this.props.layout>
            {this.state.filter === "" && Platform.select({
                mobile: <Container
                    flow="column"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    <Image
                        source={logo}
                        width={200}
                        height={200 * 1157 / 2362} // Using image dimensions
                    />
                    <Text
                        variant="caption"
                        margin={{
                            top: 8
                        }}
                    >
                        Recarga celulares hacia cualquier parte del mundo
                    </Text>
                    <Text
                        margin={{
                            top: 4,
                        }}
                    >
                        ¿A qué país quieres enviar una recarga?
                    </Text>
                </Container>
            })}
            <Input
                rounded
                placeholder="Escribe un país"
                value={this.state.filter}
                onChange={(value) => {
                    this.setState({
                        filter: value
                    })
                }}
                onEnter={() => {
                    const countries = this.props.countries.filter((country) => {
                        const {name} = country;

                        return (
                            !this.state.filter
                            || this._match(name, this.state.filter)
                        )
                    });

                    if (countries.length === 1) {
                        this.props.onSelect(countries[0]);
                    }
                }}
                width={200}
                center
                margin={{
                    top: 8
                }}
            />
            {countries.length > 0 && <Subtitle
                active
                margin={{
                    top: 24,
                }}
            >
                Selecciona un país de la lista
            </Subtitle>}
            {countries.length === 0 && <Error margin={{top: 16}}>Escribe el nombre del país para comenzar a hacer la recarga</Error>}
            {this.props.fav && this.state.filter === "" && <Container
                flow="row wrap"
                align={{
                    alignItems: "flex-start"
                }}
                margin={{
                    top: 24
                }}
            >
                {this.props.countries.map((country) => {
                    const {favorite} = country;

                    if (favorite === false) {
                        return null;
                    }

                    return this._renderCountry(country);
                })}
            </Container>}
            {this.props.fav && this.state.filter === "" && <Container
                flow="row"
                align={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
                margin={{
                    top: 24,
                }}
                padding={{
                    bottom: Platform.select({
                        web: 24
                    })
                }}
                style={Platform.select({
                    web: {
                        backgroundImage: `url(${arrow})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center bottom",
                    }
                })}
            >
                <Text>Todos los países</Text>
            </Container>}
            <Container
                flow="row wrap"
                align={{
                    alignItems: "flex-start"
                }}
                margin={{
                    top: 24
                }}
            >
                {countries}
            </Container>
        </this.props.layout>
    }

    _match = (country, input) => {
        return country
            .replace("á", "a")
            .replace("é", "e")
            .replace("í", "i")
            .replace("ó", "o")
            .replace("ú", "u")
            .replace("ñ", "n")
            .toLowerCase()
            .indexOf(input.toLowerCase()) > -1;
    };

    _renderCountry(country) {
        const {iso, name} = country;

        // Countries with no flag
        if (
            iso === 'AN'
            || iso === 'XK'
        ) {
            return null;
        }

        return <Container
            key={iso}
            flow="column"
            align={{
                alignItems: "center",
                justifyContent: "flex-start"
            }}
            margin={{
                bottom: Platform.select({
                    web: 16,
                    android: 0,
                    ios: 0,
                })
            }}
            padding={Platform.select({
                web: 16,
                android: 8,
                ios: 8
            })}
            width={Platform.select({
                web: 110,
                mobile: Platform.dimensions.isXsDown(this.props.width) ? 90 : 110,
            })}
            height={Platform.select({
                web: 110,
                mobile: Platform.dimensions.isXsDown(this.props.width) ? 90 : 110,
            })}
            onClick={() => {
                this.props.onSelect(country);
            }}
            style={Platform.select({
                web: {
                    textAlign: "center",
                }
            })}
        >
            <Flag
                iso={iso}
                size="lg"
            />
            <Text
                center
                margin={{
                    top: 4
                }}
                style={{
                    fontSize: Platform.select({
                        web: 14,
                        android: 10,
                        ios: 12
                    }),
                    textAlign: Platform.select({
                        web: "inherit",
                        android: "center",
                        ios: "center"
                    })
                }}
            >
                {name}
            </Text>
        </Container>
    }
}

export default Platform.dimensions.withWidth()(ListCountriesBlock);
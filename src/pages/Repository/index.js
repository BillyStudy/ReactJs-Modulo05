import React, { Component } from 'react';
import api from '../../services/api';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Container from '../../components/Container';
import { Loading, Owner, IssueList } from './styles';

// import { Container } from './styles';

export default class Repository extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };
  state = {
    repository: {},
    issues: [],
    loading: true
  }
  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 10
        }
      })
    ]);


    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false
    });
  }

  render() {
    const { repository, issues, loading } = this.state;
    if (loading) {
      return (
        <Loading>
          <h1>Carregando...</h1>
        </Loading>

      )
    }
    return (
      <Container>
        <Link to={`/`}>Voltar</Link>
        <Owner>

          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />

                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>

            ))
          }

        </IssueList>
      </Container>

    )
  }
}

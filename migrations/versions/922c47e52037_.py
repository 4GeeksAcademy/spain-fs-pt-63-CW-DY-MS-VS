"""empty message

Revision ID: 922c47e52037
Revises: b75b19caf1a4
Create Date: 2024-06-22 09:01:27.472440

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '922c47e52037'
down_revision = 'b75b19caf1a4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_artist', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(length=80), nullable=True))

    with op.batch_alter_table('user_client', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(length=80), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_client', schema=None) as batch_op:
        batch_op.drop_column('image')

    with op.batch_alter_table('user_artist', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###
